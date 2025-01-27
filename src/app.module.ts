import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	    useClass: ProdService,
      imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

/*
- Se a Classe AppController, não for registrada no Módulo principal da aplicação (AppModule), o endpoint do Swagger não ficará disponível.

- Para alternar entre as configurações Local e Remota, na Classe AppModule, na propriedade useClass, utilize uma das 2 opções abaixo:
useClass: DevService 🡢 O Nest executará a aplicação com a configuração do Banco de dados local (MySQL)
useClass: ProdService 🡢 O Nest executará a aplicação com a configuração do Banco de dados na nuvem (Render)
*/