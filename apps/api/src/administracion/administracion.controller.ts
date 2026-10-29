import { Controller } from '@nestjs/common';
import { AdministracionService } from './administracion.service.js';

@Controller('administracion')
export class AdministracionController {
  constructor(private readonly administracionService: AdministracionService) {}
}
