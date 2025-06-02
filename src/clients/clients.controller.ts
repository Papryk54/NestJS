import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dtos/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  getAll() {
    return this.clientsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const client = await this.clientsService.getById(id);
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  @Post()
  create(@Body() dto: CreateClientDTO) {
    return this.clientsService.create(dto);
  }
}
