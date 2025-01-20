import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService, // Classe JwtService: Serviço responsável pela geração do Token JWT.
        private bcrypt: Bcrypt

        /*Classe Bcrypt: Serviço do módulo Auth responsável por verificar se o atributo senha do objeto da 
        classe UsuarioLogin (senha não criptografada) corresponde ao atributo senha do objeto da classe Usuario (senha criptografada) armazenado no banco de dados. */
    ){ }

    /*O Método validateUser(usuario: string, senha: string) será responsável por validar os Atributos usuario (e-mail) e a senha enviados no Objeto UsuarioLogin. 
    Caso os dados dos 2 Atributos sejam validados, o usuário será autenticado. */
    async validateUser(username: string, password: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        // Verifica se o objeto buscaUsuario foi encontrado e se o objeto validaSenha é igual a true.
        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario // O operador rest é representado por ... e serve para coletar o restante das propriedades ou elementos que não foram explicitamente desestruturados.
            return resposta
        }

        return null

    }

    /*O método login(usuarioLogin: UsuarioLogin) será responsável por receber as credenciais do usuário e enviá-las ao Passport para autenticar (fazer login) 
    e validar o usuário na aplicação. Este método é essencial para o funcionamento do Passport, pois, sem a autenticação, não será possível gerar o Token JWT nem obter acesso aos endpoints protegidos. */
    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.usuario }

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}
/*Nessas linhas, criaremos o corpo da resposta para a autenticação bem-sucedida, no formato JSON. 
O objeto JSON conterá todos os atributos encontrados na busca do objeto Usuario, 
exceto a senha e o Token, que será gerado pelo método jwtService.sign(payload). */