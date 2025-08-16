import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

interface EmailVerificationPayload {
  email: string;
}

@Injectable()
export class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });
  }

  async sendEmail(to, subject, body) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: body,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
