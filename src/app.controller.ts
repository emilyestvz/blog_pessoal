import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

// para definir um controlador no Spring Boot
@Controller()
export class AppController {
  constructor() {} // Removemos a Injeção de Dependência da Classe AppService, porquê não iremos precisar do Método getHello().

  @ApiExcludeEndpoint() // Inserimos o decorador @ApiExcludeEndpoint(), porquê não iremos precisar deste endpoint no Swagger.
  @Get()
  async redirect(@Res() resposta: any){
    return resposta.redirect('/swagger');
  }
}

/*COMENTÁRIOS FINAIS:
O decorador @Get() mapeia todas as Requisições HTTP GET, enviadas para o endereço local (seu computador) http://localhost:4000/ 
 (endereço principal da aplicação).*/