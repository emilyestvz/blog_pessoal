import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// MÉTODOS CRUD
@ApiTags('Postagem')
@UseGuards(JwtAuthGuard) // colocando a proteção na classe, para q todos sejam protegidos
@Controller('/postagens')
@ApiBearerAuth()
export class PostagemController {

    constructor(
        private readonly postagemService: PostagemService
    ){}

    /*Se alguém fizer uma requisição GET /postagens, 
    o método findAll() será chamado e retornará os dados do banco.*/
    @Get()
    @HttpCode(HttpStatus.OK)
    findall(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo') // 1º 'titulo': caminho | 2º 'titulo': variável
    @HttpCode(HttpStatus.OK) //parseintpipe n precisa pois titulo é uma string
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo(titulo);
    }
    
    // verbo POST para guardar a inserção de dados
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    // verbo DELETE para excluir um registro
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }
}