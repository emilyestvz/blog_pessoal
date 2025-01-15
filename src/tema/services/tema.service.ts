import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    // Buscar todos os temas
    async findAll(): Promise<Tema[]> {

        return await this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    // Buscar tema por ID
    async findById(id: number): Promise<Tema> {

        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if(!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return tema;
    }

    // Buscar tema por descrição
    async findByDescricao(descricao: string): Promise<Tema[]> {

        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        })
    }

    // Criar um novo tema
    async create(Tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(Tema);
    }

    // Atualizar tema existente
    async update(tema: Tema): Promise<Tema> {

        await this.findById(tema.id); // Garante que o tema existe antes de atualizar

        return await this.temaRepository.save(tema);
    }

    // Deletar tema por ID
    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id); // Garante que o tema existe antes de deletar
        return await this.temaRepository.delete(id);
    }
}