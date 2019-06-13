import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('users/me/current-house')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetRecipesController {
  @ApiOperation({ title: 'Get recipes of the logged user current house' })
  @Get('/recipes')
  public index() {}
}
