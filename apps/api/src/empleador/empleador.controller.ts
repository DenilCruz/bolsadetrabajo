import { Controller } from '@nestjs/common';
import { EmpleadorService } from './empleador.service.js';

@Controller('empleador')
export class EmpleadorController {
  constructor(private readonly empleadorService: EmpleadorService) {}
}
