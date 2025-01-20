/*Nesta Classe vamos criar o Guard personalizado, que será utilizado pelo endpoint de autenticação para receber 
as credenciais do usuário (usuario e senha) e enviar para o Passport Local Strategy validar e autenticar o usuário no sistema. 

Observe que a Classe de Serviço LocalAuthGuard foi criada como uma Herança da Classe AuthGuard, que pertence ao Passport Strategy local.

Essa Classe será utilizada na Classe AuthController, no Método login, 
para redirecionar as Requisições de Login para a Estratégia Local do Passport, ou seja, a autenticação do usuário, via Banco de dados.*/

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}