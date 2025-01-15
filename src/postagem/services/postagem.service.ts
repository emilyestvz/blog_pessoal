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
    // select * from tb_postagens;
    async findAll(): Promise<Postagem[]> {
        return this.postagemRepository.find({
            // habilitando o relacionamento na consulta
            relations: {
                tema: true
            }
        }); 
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
        await this.temaService.findById(postagem.tema.id);

        // await para n travar a app enquanto salva e aguardar a promise
        return await this.postagemRepository.save(postagem); // insert into tb_postagens (titulo, texto, data) values ('Novo Título', 'Novo Texto', NOW());
    }

    // Método update
    async update(postagem: Postagem): Promise<Postagem> {

        // verifica se tem um tema associado
        await this.findById(postagem.id);
        await this.temaService.findById(postagem.tema.id)

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