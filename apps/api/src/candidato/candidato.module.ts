import { Module } from '@nestjs/common';
import { CandidatoController } from './candidato.controller.js';
import { CandidatoService } from './candidato.service.js';

@Module({
  controllers: [CandidatoController],
  providers: [CandidatoService],
  exports: [CandidatoService],
})
export class CandidatoModule {}
