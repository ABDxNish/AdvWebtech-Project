import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseDto } from './Dto/ResponseDto';
import { UpdatePhoneDto } from './Dto/update-phone.dto';
import { CreateUserCategory2Dto } from './Dto/CreateUserCategory2Dto';
import { Lab3Service } from './lab3.service';

@Controller('lab3')
export class Lab3Controller {
     constructor(private readonly userCategory2Service: Lab3Service) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserCategory2Dto): Promise<ResponseDto> {
    const result: ResponseDto = {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: null,
    };

    try {
      const created = await this.userCategory2Service.create(dto);
      result.status = true;
      result.statusCode = HttpStatus.CREATED;
      result.data = created;
    } catch (error) {
      result.error = error.message;
      result.statusCode = HttpStatus.BAD_REQUEST;
    }

    return result;
  }

  @Patch(':id/phone')
  @UsePipes(new ValidationPipe())
  async updatePhone(
    @Param('id') id: string,
    @Body() dto: UpdatePhoneDto,
  ): Promise<ResponseDto> {
    const result: ResponseDto = {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: null,
    };

    try {
      const updated = await this.userCategory2Service.updatePhone(id, dto);
      result.status = true;
      result.statusCode = HttpStatus.OK;
      result.data = updated;
    } catch (error) {
      result.error = error.message;
      result.statusCode = HttpStatus.BAD_REQUEST;
    }

    return result;
  }

  @Get('null-fullname')
  async findNullFullNames(): Promise<ResponseDto> {
    const result: ResponseDto = {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: null,
    };

    try {
      const data = await this.userCategory2Service.findNullFullNames();
      result.status = true;
      result.statusCode = HttpStatus.OK;
      result.data = data;
    } catch (error) {
      result.error = error.message;
      result.statusCode = HttpStatus.BAD_REQUEST;
    }

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto> {
    const result: ResponseDto = {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: null,
    };

    try {
      const cleanId = id.trim();
      const deleted = await this.userCategory2Service.remove(cleanId);

      result.status = true;
      result.statusCode = HttpStatus.OK;
      result.data = deleted;
    } catch (error) {
      result.error = error.message;
      result.statusCode = HttpStatus.NOT_FOUND;
    }

    return result;
  }
}
