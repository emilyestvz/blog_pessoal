import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

// MÉTODOS CRUD
@Controller('/postagens')
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
}