import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any){
        return payload;
    }
}

/*payload: é um Objeto JSON, que contém as declarações do Token JWT, definidas no padrão JSON WEB Token. 
As declarações são as informações sobre uma entidade (normalmente, o usuário) e alguns dados adicionais */