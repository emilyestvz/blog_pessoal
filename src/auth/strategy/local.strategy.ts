import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private _usernameField: string; //recebe as injeções de dependências: injetamos um Objeto dessa Classe no Construtor da LocalStrategy.
    private _passwordField: string;

    constructor(private readonly authService: AuthService) {
        super();  // Esse método inicializa a PassportStrategy, estabelecendo a base para a nossa estratégia local.
        this._usernameField = 'usuario';
        this._passwordField = 'senha';
    }

    async validate(usuario: string, senha: string): Promise<any> {
        const validaUsuario = await this.authService.validateUser(usuario, senha);
        if (!validaUsuario) {
            throw new UnauthorizedException("Usuário e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}
