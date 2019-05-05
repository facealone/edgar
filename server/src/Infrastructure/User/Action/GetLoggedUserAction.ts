import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailView } from 'src/Application/User/View/UserDetailView';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
export class GetLoggedUserAction {
  @ApiOperation({ title: 'Get logged user information' })
  @UseGuards(AuthGuard())
  @Get('/me')
  public index(@LoggedUser() user): UserDetailView {
    return new UserDetailView(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
    );
  }
}
