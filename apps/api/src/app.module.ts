import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PublicoModule } from './publico/publico.module.js';
import { CandidatoModule } from './candidato/candidato.module.js';
import { EmpleadorModule } from './empleador/empleador.module.js';
import { AdministracionModule } from './administracion/administracion.module.js';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PublicoModule,
    CandidatoModule,
    EmpleadorModule,
    AdministracionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
