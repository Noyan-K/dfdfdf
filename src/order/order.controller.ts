// import { Controller, NotFoundException, ParseIntPipe } from '@nestjs/common';
// import {
//   Get, Param, Res, UseGuards,
// } from '@nestjs/common/decorators';
// import { Response } from 'express';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { ValidatedUser } from 'src/auth/interfaces/validatedUser.interface';
// import { CurrentUser } from 'src/user/decorators/user.decorator.restapi';
// import { OrderService } from './order.service';

// @Controller('order')
// export class OrderController {
//   constructor(private orderService: OrderService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get('download/:orderId')
//   async downloadOrderExcel(
//   @CurrentUser() user: ValidatedUser,
//     @Param('orderId', ParseIntPipe) orderId: number,
//     @Res() res: Response,
//   ) {
//     try {
//       const newFile: string = await this.orderService.downloadOrderExcel(
//         user.id,
//         orderId,
//       );

//       return res.download(newFile);
//     } catch (e) {
//       throw new NotFoundException();
//     }
//   }
// }
