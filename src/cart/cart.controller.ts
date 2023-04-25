import { Controller, NotFoundException, ParseIntPipe } from '@nestjs/common';
import {
  Get, Param, Res, UseGuards,
} from '@nestjs/common/decorators';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidatedUser } from 'src/auth/interfaces/validatedUser.interface';
import { CurrentUser } from 'src/user/decorators/user.decorator.restapi';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('download/:cartId')
  // async downloadCartExcel(
  // @CurrentUser() user: ValidatedUser,
  //   @Param('cartId', ParseIntPipe) cartId: number,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const newFile: string = await this.cartService.downloadCartExcel(
  //       user.id,
  //       cartId,
  //     );

  //     return res.download(newFile);
  //   } catch (e) {
  //     throw new NotFoundException();
  //   }
  // }
}
