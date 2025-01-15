import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ){}

    // Listagem
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {
                tema: true
            }
        }); // select * from tb_postagens;
    }

    // Consulta por ID
    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true
            }
        });

        if(!postagem) 
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return postagem;
    }

    // Consulta por Título
    async findByTitulo(titulo: string): Promise<Postagem[]> {
        
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // ILike - Case Insensitive | Like - Case Sensitive
            },
            relations: {
                tema: true
            }
        }); 
    }

    // Método de inserção/criação de dados
    async create(postagem: Postagem): Promise<Postagem> {

        // verifica se tem um tema associado
        if(!postagem.tema) {
            const tema = await this.temaService.findById(postagem.tema.id);
            postagem.tema = tema;
        }

        postagem.data = new Date(); // seta a data atual no momento da criação

        // await para n travar a app enquanto salva e aguardar a promise
        return await this.postagemRepository.save(postagem); // insert into tb_postagens (titulo, texto, data) values ('Novo Título', 'Novo Texto', NOW());
    }

    // Método update
    async update(postagem: Postagem): Promise<Postagem> {

        // verifica se tem um tema associado
        if(!postagem.tema) {
            const tema = await this.temaService.findById(postagem.tema.id);
            postagem.tema = tema;
        }
        
        postagem.data = new Date(); // atualiza a data atual no momento da atualização
        
        await this.findById(postagem.id);

        /* update tb_postagens set titulo = postagem.titulo, texto = postagem.texto, 
        data = current_timestamp() where id = postagem.id */
        return await this.postagemRepository.save(postagem);
    }

    // Método delete 
    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);
        
        return await this.postagemRepository.delete(id); // delete from tb_postagens where id = id;
    }
}