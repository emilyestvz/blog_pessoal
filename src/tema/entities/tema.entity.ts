import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'tb_temas'})
export class Tema {

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty() 
    descricao: string

    // Relação com a Classe Postagem, Classe Tema será 1:N - OneToMany
    @ApiProperty() 
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]; // objeto array: para somente mostar as postagens
}