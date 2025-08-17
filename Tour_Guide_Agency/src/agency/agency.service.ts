import { Injectable } from '@nestjs/common';
import {
  AGENCY_INFO,
  BLOG_INFO,
  BOOKING_INFO,
  COMMENT_INFO,
  DESTINATION_INFO,
  LOGIN_INFO,
  PACKAGE_INFO,
  PAYMENT_INFO,
  REVIEW_INFO,
  TRANSPORT_INFO,
  USER_INFO,
} from './DB.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { emit } from 'process';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from './dtos/login.dto';
import { AgencyDto } from './dtos/Agency.dto';
import { PackageDto } from './dtos/Package.dto';
import { BlogDto } from './dtos/Blog.dto';
import { EditAgencyProfileDto } from './dtos/EditAgencyProfile.dto';
 
@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(LOGIN_INFO)
    private login_info_Repository: Repository<LOGIN_INFO>,
 
    @InjectRepository(USER_INFO)
    private user_info_Repository: Repository<USER_INFO>,
 
    @InjectRepository(AGENCY_INFO)
    private agency_info_Repository: Repository<AGENCY_INFO>,
 
    @InjectRepository(BOOKING_INFO)
    private booking_info_Repository: Repository<BOOKING_INFO>,
 
    @InjectRepository(PACKAGE_INFO)
    private package_info_Repository: Repository<PACKAGE_INFO>,
 
    @InjectRepository(TRANSPORT_INFO)
    private transport_info_Repository: Repository<TRANSPORT_INFO>,
 
    @InjectRepository(PAYMENT_INFO)
    private payment_info_Repository: Repository<PAYMENT_INFO>,
 
    @InjectRepository(DESTINATION_INFO)
    private destination_info_Repository: Repository<DESTINATION_INFO>,
 
    @InjectRepository(REVIEW_INFO)
    private review_info_Repository: Repository<REVIEW_INFO>,
 
    @InjectRepository(BLOG_INFO)
    private blog_info_Repository: Repository<BLOG_INFO>,
 
    @InjectRepository(COMMENT_INFO)
    private comment_info_Repository: Repository<COMMENT_INFO>,
 
    private readonly EmailService: EmailService,
  ) {}
 
  async passwordHasing(data) {
    // let password = data['password'];
    let password = data;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
 
    return hashedPassword;
  }
 
  generateAccessToken(user) {
    return jwt.sign(
      // Payload
      { id: user.id, email: user.email },
      // Access Token Secret
      process.env.ACCESS_TOKEN_SECRET,
      // Expiry
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );
  }
 
  generateRefreshToken(user) {
    return jwt.sign(
      // Payload
      { id: user.id, email: user.email },
      // Access Token Secret
      process.env.REFRESH_TOKEN_SECRET,
      // Expiry
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );
  }
 
  async signUp(data : AgencyDto) {
    const agencyData = {
      name: data.name,
      email: data.email,
      address: data.address,
      company_size: data.company_size,
      description: data.description,
      phone_no: data.phone_no,
      status: data.status,
    };
 
    console.log(data);
 
    const agency = await this.agency_info_Repository.save(agencyData);
    const hashedPass = await this.passwordHasing(data['password']);
 
    console.log(hashedPass);
 
    const loginData = {
      email: data.email,
      password: hashedPass,
      user_type: 'Agency',
      user: agency,
    };
 
    await this.login_info_Repository.save(loginData);
 
    const email = await this.EmailService.sendEmail(agencyData.email, "Account Creation", "You have successfully created an account using this email");
 
    return { message: 'Agency register successfully.' };
  }
 
  async login(data : LoginDto, res) {
    let email = data['email'];
    let password = data['password'];
 
    // Find user
    const user = await this.login_info_Repository.findOne({ where: { email } });
 
    if (!user) {
      return res.json({ message: 'User not found!' });
    }
 
    // Check password
    const isMatch = await bcrypt.compare(password, user['password']);
 
    if (!isMatch) {
      return res.json({ message: "Credentials didn't match." });
    }
 
    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
 
    // update token in db
    user.refreshToken = refreshToken;
    await this.login_info_Repository.update(
      { email: user.email }, // Find user through email
      { refreshToken: refreshToken }, // Update refreshToken
    );
 
    // Cannot modify cookies from the client site
    const options = { httpOnly: true, secure: false };
 
    // send access token and refresh token to the user using cookie
    return res
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json({ message: 'Login Successful' });
  }
 
  async verifyUser(req, res) {
    // Get token from the cookie or the header
    const token =
      (await req.cookies?.accessToken) ||
      req.header('Authorization')?.replace('Bearer ', '');
 
    console.log(token);
    if (!token) {
      return res.json({ message: 'Unauthorized request!' });
    }
 
    try {
      //decode the token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
      if (typeof decodedToken === 'string') {
        return res.json({ message: 'Invalid token format' });
      }
 
      // get email using decoded token [nessesary to find the user]
      const userEmail = decodedToken.email;
 
      // find the user
      const user = await this.login_info_Repository.findOne({
        where: { email: userEmail },
      });
 
      // check if the user has valid refresh token
      if (!user) {
        return res.json({ message: 'Invalid Access Token' });
      }
 
      return user;
    } catch {
      return res.json({ message: 'Something went wrong while verifing' });
    }
  }
 
  async editAgencyProfile(data : EditAgencyProfileDto, req, res) {
    const user = await this.verifyUser(req, res);
 
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const userEmail = user['email'];
 
    const row_agencyInfoTable = await this.agency_info_Repository.findOne({
      where: { email: userEmail },
    });
    const row_loginInfoTable = await this.login_info_Repository.findOne({
      where: { email: userEmail },
    });
 
    if (!row_agencyInfoTable || !row_loginInfoTable) {
      return res.json({ message: 'User not found!' });
    }
 
    const updatedInfo_agencyInfoTable = Object.assign(
      row_agencyInfoTable,
      data,
    );
 
    await this.agency_info_Repository.save(updatedInfo_agencyInfoTable);
    await this.login_info_Repository.update(
      { email: userEmail },
      { email: userEmail },
    );
 
    return res.json({ message: 'Profile updated successfully.' });
  }
 
  async logout(req, res) {
    const user = await this.verifyUser(req, res);
 
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const options = { httpOnly: true, secure: false };
 
    // update token to null as the user wants to logout
    await this.login_info_Repository.update(
      { email: user['email'] },
      { refreshToken: null },
    );
 
    // clear the cookies[access token, refresh token] from client side
    res.clearCookie('accessToken', options);
    res.clearCookie('refreshToken', options);
 
    return res.json({ message: 'Logout Successful' });
  }
 
  async CreatePackage(data : PackageDto, req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const packeageData = {
      name: data.name,
      description: data.description,
      price: data.price,
      agency_id: user.user_id,
    };
 
    await this.package_info_Repository.save(packeageData);
 
    return res.json({ messge: 'Package Added.' });
  }
 
  async EditPackage(data : PackageDto, id, req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const packageDetails = await this.package_info_Repository.findOne({
      where: { id: id },
    });
 
    await this.package_info_Repository.update(
      { id: packageDetails.id },
      { name: data.name, description: data.description, price: data.price },
    );
    return res.json({ message: 'Update successfully' });
  }
 
  async DeletePackage(id, req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const packageDetails = await this.package_info_Repository.findOne({
      where: { id: id },
    });
 
    await this.package_info_Repository.delete(id);
 
    return res.json({ message: 'Delete successfully' });
  }
 
  async UploadBlog(data : BlogDto, req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const packeageData = {
      title: data.title,
      content: data.content,
      author_id: user.user_id,
      comment_count: 0,
      created_at: new Date(),
      react_count: 0,
    };
 
    await this.blog_info_Repository.save(packeageData);
 
    return res.json({ messge: 'Blog Uploaded...' });
  }
 
  async EditBlog(data : BlogDto, id, req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const blogDetails = await this.blog_info_Repository.findOne({
      where: { id: id },
    });
 
    await this.blog_info_Repository.update(
      { id: blogDetails.id },
      { title: data.title, content: data.content },
    );
    return res.json({ message: 'Edit successfully' });
  }
 
  async DeleteBlog(id, req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const blogDetails = await this.blog_info_Repository.findOne({
      where: { id: id },
    });
 
    await this.blog_info_Repository.delete(id);
 
    return res.json({ message: 'Delete successfully' });
  }
 
  async showBlog(req, res) {
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }
 
    const blogs = await this.blog_info_Repository.find({
      where: { author_id: user.user_id },
    });
 
    return res.json(blogs);
  }

  async DeleteAgency(id, req, res) {
    console.log("called");
    const user = await this.verifyUser(req, res);
    if (!user) {
      return res.json({ message: 'Invalid or expired session!' });
    }

    const agencyDetails = await this.agency_info_Repository.findOne({
      where: { id: id },
    });

    await this.agency_info_Repository.delete(id);

    return res.json({ message: 'Delete successfully' });
  }


}
 
 