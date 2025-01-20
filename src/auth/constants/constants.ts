/*O valor atribuído ao atributo secret é uma chave encriptada aleatória, 
gerada através do algoritmo de Criptografia chamado AES. 

Para gerar esta chave, utilizamos o site Key Generator (https://generate-random.org/encryption-key-generator), 
que permite gerar chaves encriptadas aleatórias no formato SHA 256, */

export const jwtConstants = {
    secret: '37eb3d74e44561d2b9ec3e40da179f9e91571b7f350aee31cfee06b481f146fe',
};