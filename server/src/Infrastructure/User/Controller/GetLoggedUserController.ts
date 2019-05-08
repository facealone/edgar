import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUserView } from 'src/Application/User/View/LoggedUserlView';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetLoggedUserController {
  @ApiOperation({ title: 'Get logged user information' })
  @Get('/me')
  public index(@LoggedUser() user): LoggedUserView {
    return new LoggedUserView(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
    );
  }
}
