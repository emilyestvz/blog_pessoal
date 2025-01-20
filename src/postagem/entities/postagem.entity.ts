import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

// CRIAÇÃO DA CLASSE MODEL

// create table tb_postagens
@Entity({ name: 'tb_postagens' }) 
export class Postagem {

  // Definição dos campos da tabela tb_postagens
  @PrimaryGeneratedColumn()         // create column id INT AUTO_INCREMENT PRIMARY KEY
  id: number;

  /*Arrow Function, executamos o método trim(),
   (método para manipular string), para remover todos os os espaços em branco do valor do atributo */
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()         // não pode ser vazio - validação dos dados do objeto
  @Column({ length: 100, nullable: false })         // create column titulo VARCHAR(255)
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) // create column texto TEXT
  texto: string;

  // create column data DATE NOT NULL
  @UpdateDateColumn() 
  data: Date;
  
  

  // Criação do primeiro Relacionamento ManytoOne N:1 com a classe Tema
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: "CASCADE" // definição da propriedade onDelete (efeito cascata: apagou tema, apagou postagem)
  })
  // create column tema_id INT NOT NULL
  tema: Tema; // objeto 

  // Criação do segundo Relacionamento ManytoOne N:1 com a classe Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: "CASCADE" 
  })
  usuario: Usuario; 
}