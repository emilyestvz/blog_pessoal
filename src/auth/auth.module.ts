import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { UsuarioModule } from "../usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        JwtModule.register({
            secret: jwtConstants.secret, // onde buscar a chave de autentificação
            signOptions: {expiresIn: '1h'} // o token tem duração de 1h
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};