import { Module } from '@nestjs/common';
import { AdministracionController } from './administracion.controller.js';
import { AdministracionService } from './administracion.service.js';

@Module({
  controllers: [AdministracionController],
  providers: [AdministracionService],
  exports: [AdministracionService],
})
export class AdministracionModule {}
