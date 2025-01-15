import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ){}

    // 
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find(); // select * from tb_postagens;
    }

    
    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({where: {id}});

        if(!postagem) 
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // ILike - Case Insensitive | Like - Case Sensitive
            },
        }); 
    }

    // método de inserção/criação de dados
    async create(postagem: Postagem): Promise<Postagem> {
        // await para n travar a app enquanto salva e aguardar a promise
        return await this.postagemRepository.save(postagem); // insert into tb_postagens (titulo, texto, data) values ('Novo Título', 'Novo Texto', NOW());
    }

    // método update
    async update(postagem: Postagem): Promise<Postagem> {
        
        await this.findById(postagem.id);

        /* update tb_postagens set titulo = postagem.titulo, texto = postagem.texto, 
        data = current_timestamp() where id = postagem.id */
        return await this.postagemRepository.save(postagem);
    }

    // método delete 
    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);
        
        return await this.postagemRepository.delete(id); // delete from tb_postagens where id = id;
    }
}