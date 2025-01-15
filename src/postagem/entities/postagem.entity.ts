// CLASSE MODEL
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_postagens' }) // create table tb_postagens
export class Postagem {

  // Definição dos campos da tabela tb_postagens
  @PrimaryGeneratedColumn() // create column id INT AUTO_INCREMENT PRIMARY KEY
  id: number;

  /*Arrow Function, executamos o método trim(),
   (método para manipular string), para remover todos os os espaços em branco do valor do atributo */
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() // não pode ser vazio - validação dos dados do objeto
  @Column({ length: 100, nullable: false }) // create column titulo VARCHAR(255)
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) // create column texto TEXT
  texto: string;

  @UpdateDateColumn() // create column data DATE NOT NULL
  data: Date;
}