import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({name: 'tb_temas'})
export class Tema {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string

    // Relação com a Classe Postagem, Classe Tema será 1:N - OneToMany
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]; // objeto array: para somente mostar as postagens
}