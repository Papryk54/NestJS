import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({ where: { id } });
  }

  public async create(orderData: CreateOrderDTO): Promise<Order> {
    const { productId, clientId } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          product: { connect: { id: productId } },
          client: { connect: { id: clientId } },
        },
        include: { product: true, client: true },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product or Client doesn't exist");
      throw error;
    }
  }

  public async updateById(
    id: Order['id'],
    orderData: UpdateOrderDTO,
  ): Promise<Order> {
    const data: any = {};
    if (orderData.productId)
      data.product = { connect: { id: orderData.productId } };
    if (orderData.clientId)
      data.client = { connect: { id: orderData.clientId } };
    return this.prismaService.order.update({
      where: { id },
      data,
      include: { product: true, client: true },
    });
  }
}
