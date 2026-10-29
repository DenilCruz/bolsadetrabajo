import { Module } from '@nestjs/common';
import { EmpleadorController } from './empleador.controller.js';
import { EmpleadorService } from './empleador.service.js';

@Module({
  controllers: [EmpleadorController],
  providers: [EmpleadorService],
  exports: [EmpleadorService],
})
export class EmpleadorModule {}
