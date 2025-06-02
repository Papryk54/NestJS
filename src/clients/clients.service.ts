import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Client } from '@prisma/client';
import { CreateClientDTO } from './dtos/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  getById(id: string): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id } });
  }

  async create(data: CreateClientDTO): Promise<Client> {
    try {
      return await this.prisma.client.create({ data });
    } catch {
      throw new BadRequestException('Unable to create client');
    }
  }
}
