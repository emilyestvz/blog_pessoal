import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
    exports: [UsuarioService],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})
export class UsuarioModule {};