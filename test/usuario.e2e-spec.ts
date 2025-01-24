import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
 
describe('Testes dos Módulos Usuario e Auth (e2e)', () => {
 
  let token: any;
  let usuarioId: any;
  let app: INestApplication;
 
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule
      ],
    }).compile();
 
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
 
  afterAll(async () => {
    await app.close();
  });


  // Criação dos métodos
  it('01 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201) // (CREATED 🡪 201)
 
    usuarioId = resposta.body.id;
  });

  it('02 - Não deve cadastrar um Usuário Duplicado', async () => {

    /*Neste Método, como não iremos extrair nenhum atributo do Corpo da Requisição, não foi criado uma const. 
    Utilizamos a palavra return que executará e retornará a Resposta do Método request(), que cria uma Requisição 
    que será enviada para a aplicação que foi gerada pelo Nest com o ambiente de testes. */
    return await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })

    // se está duplicando usuários no Banco de dados, ao invés de checarmos se o objeto foi persistido (CREATE 🡪 201), checaremos se ele não foi persistido (BAD_REQUEST 🡪 400).
    .expect(400) 
  });

  it('03 - Deve Autenticar um Usuário (Login)', async () => {
    const resposta = await request(app.getHttpServer())
     .post('/usuarios/login')
     .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
     .expect(200); // Teste passa (OK 🡪 200)

     /*Vamos armazenar na variável token o Atributo token do usuário autenticado, porquê iremos utilizar o token em outros testes. 
     Para obter o token, vamos utilizar o Método resposta.body.token, para extrair o Atributo token do Corpo da Resposta da Requisição. */
     token = resposta.body.token;
  });

  it('04 - Deve listar todos os Usuários', async () => {
    return await request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .expect(200); 
  });

  it('05 - Deve Atualizar um Usuários', async () => {
    return await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(200)
    .then( resposta => {
      expect('Root Atualizado').toEqual(resposta.body.nome);
    })
  });

 
});