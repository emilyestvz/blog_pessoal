import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) // decorador com parametro Usuario
        private usuarioRepository: Repository<Usuario>, // injeções
        private bcrypt: Bcrypt
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                postagem: true,
            }
        }
        );
    }

    // Método auxiliar para validação do usuário
    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);
        
        // Verificará se o usuário (e-mail) já existe, impedindo a duplicação de registros.
        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST); 

        // Aplicará a criptografia Bcrypt na senha, garantindo que a senha do usuário seja armazenada de forma segura.
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario); /*Retorna a execução do método save() da interface usuarioRepository. O resultado da execução do método save() será um objeto da classe Usuario persistido no banco de dados, na tabela tb_usuarios. */
    }

    async update(usuario: Usuario): Promise<Usuario> {

        /*Chamamos o método findById(id: number), da classe UsuarioService, 
        para verificar se o objeto Usuario a ser atualizado já existe no banco de dados, com base no id. */
        await this.findById(usuario.id);

        /*Criamos um objeto da classe Usuario, chamado buscaUsuario, 
        que irá armazenar o resultado da execução do método findByUsuario(usuario: string), da classe UsuarioService. 
        O objetivo é verificar se o atributo usuario (o e-mail) do objeto a ser atualizado já existe no banco de dados. */
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        /*Verificamos se o objeto buscaUsuario não é nulo e se o atributo id do objeto buscaUsuario (encontrado no banco de dados) 
        é diferente do atributo id do objeto usuario (enviado na requisição). */
        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}