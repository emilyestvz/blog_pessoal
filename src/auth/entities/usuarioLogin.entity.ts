// Entidade Auxiliar, para armazenar o usuario e a senha (mas n gera tabela no banco de dados
import { ApiProperty } from "@nestjs/swagger";

export class UsuarioLogin {

    @ApiProperty() 
    public usuario: string;

    @ApiProperty() 
    public senha: string;
}