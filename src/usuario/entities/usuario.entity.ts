import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
import { Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty() // mapeia o atributo da classe entidade, todos os atributos da classe precisam ser 'decorados'
    nome: string

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsEmail() // Checkar o email
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: 'email@email.com'}) // Para lembrar que o atributo usuario deve ser preenchido com um email
    usuario: string

    
    @Transform(({value}: TransformFnParams) => value?.trim())
    @MinLength(8) // Para a senha ter no minimo 8 caracteres
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty()
    senha: string

    @Column({length: 5000 })
    @ApiProperty()
    foto: string

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}