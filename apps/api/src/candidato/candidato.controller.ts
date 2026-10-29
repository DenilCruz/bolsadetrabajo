import { Controller } from '@nestjs/common';
import { CandidatoService } from './candidato.service.js';

@Controller('candidato')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}
}
