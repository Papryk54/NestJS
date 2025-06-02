import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [ClientsService, PrismaService],
  controllers: [ClientsController],
})
export class ClientsModule {}
