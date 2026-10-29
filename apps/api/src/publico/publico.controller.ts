import { Controller, Get } from '@nestjs/common';
import { PublicoService } from './publico.service.js';

@Controller('publico')
export class PublicoController {
  constructor(private readonly publicoService: PublicoService) {}

  @Get('distritos')
  async obtenerVacantesPorDistrito() {
    return this.publicoService.obtenerVacantesPorDistrito();
  }
}
