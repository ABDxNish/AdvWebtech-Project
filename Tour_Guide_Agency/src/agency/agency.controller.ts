import { Body, Controller, Post, Res, Get, Req, Param, Delete, UseGuards } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AuthGuard } from 'src/guard/jwt.guard';
import { LoginDto } from './dtos/login.dto';
import { AgencyDto } from './dtos/Agency.dto';
import { PackageDto } from './dtos/Package.dto';
import { BlogDto } from './dtos/Blog.dto';
import { EditAgencyProfileDto } from './dtos/EditAgencyProfile.dto';

@Controller('agency')
export class AgencyController {
    constructor(private readonly AgencyService: AgencyService) { }

    @Get("/passwordHasing")
    passwordHasing(@Body() data) {
        return this.AgencyService.passwordHasing(data);
    }
    @Post("/signUp")
    signUp(@Body() data : AgencyDto) {
        return this.AgencyService.signUp(data);
    }

    @Post("/login")
    login(@Body() data : LoginDto, @Res() res) {
        return this.AgencyService.login(data, res);
    }
     @Delete("/DeleteAgency/:id")
    Delete(@Param('id') id, @Req() req, @Res() res) {
        return this.AgencyService.DeleteAgency(id, req, res);
    }


    @UseGuards(AuthGuard)
    @Post("/editAgencyProfile")
    editAgencyProfile(@Body() data : EditAgencyProfileDto, @Req() req, @Res() res) {
        return this.AgencyService.editAgencyProfile(data, req, res);
    }

    @UseGuards(AuthGuard)
    @Post("/logout")
    logout(@Req() req, @Res() res) {
        return this.AgencyService.logout(req, res);
    }

    @UseGuards(AuthGuard)
    @Post("/CreatePackage")
    CreatePackage(@Body() data : PackageDto, @Req() req, @Res() res) {
        return this.AgencyService.CreatePackage(data, req, res);
    }

    @UseGuards(AuthGuard)
    @Post("/EditPackage/:id")
    EditPackage(@Body() data : PackageDto, @Param('id') id, @Req() req, @Res() res) {
        return this.AgencyService.EditPackage(data, id, req, res);
    }

    @UseGuards(AuthGuard)
    @Delete("/DeletePackage/:id")
    DeletePackage(@Param('id') id, @Req() req, @Res() res) {
        return this.AgencyService.DeletePackage(id, req, res);
    }

    @UseGuards(AuthGuard)
    @Post("/UploadBlog")
    UploadBlog(@Body() data : BlogDto, @Req() req, @Res() res) {
        return this.AgencyService.UploadBlog(data, req, res);
    }

    @UseGuards(AuthGuard)
    @Post("/EditBlog/:id")
    EditBlog(@Body() data : BlogDto, @Param('id') id, @Req() req, @Res() res) {
        return this.AgencyService.EditBlog(data, id, req, res);
    }

    @UseGuards(AuthGuard)
    @Delete("/DeleteBlog/:id")
    DeleteBlog(@Param('id') id, @Req() req, @Res() res) {
        return this.AgencyService.DeleteBlog(id, req, res);
    }

    @UseGuards(AuthGuard)
    @Get("/ShowBlog")
    ShowBlog(@Req() req, @Res() res) {
        return this.AgencyService.showBlog(req, res);
    }
}
