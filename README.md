# [API] Conversão de Moeda

Considere que, num cenário hipotético, estaremos expandindo os negócios e rompendo as fronteiras brasileiras. Em breve começaremos a vender os nossos produtos no exterior. Acontece que nós enviamos as mercadorias a partir dos nossos centros de distribuição que estão no Brasil. Porém, o cliente poderá pagar em sua moeda local.

Com este cenário em mente, encontramos um desafio, que é expor o valor das mercadorias na moeda corrente do cliente.

Precisamos de uma solução tecnológica em que os clients (frontend, app, outras aplicações backend. . . dentre outros) possam consultar o valor em outras moedas.

## Meu contatos para bater um papo

**Renato Vicente**
email: rntvicnete@gmail.com
twiiter: @rntvicente
instagram: @renatovicente_dev
linkedIn: https://www.linkedin.com/in/vicenterenato/

---


## RFC #1

Tema: Decisão de linguagem

**Visão geral**
Objetivo desse documento é esclarecer minha decisão em realizar o desafio usando NodeJS com ExpressJS + typeScript.

**Beneficíos Esperados**
Utilização desse setup proporciona várias vantagens:

**- Tipagem Estática com TypeScript:** TypeScript é uma linguagem superset do JavaScript que adiciona recursos de tipagem estática. Ao escolher o TypeScript, busco garantir que os tipos de dados utilizados no código estejam corretos em tempo de compilação, o que pode evitar muitos erros comuns e melhorar a robustez do sistema. Além disso, a tipagem estática também ajuda na compreensão do código, tornando mais fácil para pessoas desenvolvedoras entenderem como os diferentes componentes interagem.

**- Performance:** Node.js é uma plataforma construída sobre o motor JavaScript V8 da Google, que é altamente otimizado para executar código JavaScript de maneira eficiente. Ao usar Node.js, obtémos um ambiente de execução de alto desempenho. Além disso, o uso de TypeScript não compromete significativamente o desempenho, pois o TypeScript é transpilado para JavaScript puro, que é o que o Node.js executa.

**- Ecossistema e Comunidade:** Node.js tem uma comunidade ativa e um ecossistema de bibliotecas e ferramentas bem estabelecidos. Isso significa que você terá acesso a uma ampla gama de recursos que podem acelerar o desenvolvimento do seu projeto. Além disso, o TypeScript também é bem suportado na comunidade Node.js, e muitas bibliotecas populares estão sendo desenvolvidas com suporte total ou parcial ao TypeScript.

**- Familiaridade e Produtividade:** Sou experiente em JavaScript, a transição para o Node.js é relativamente suave. O uso do TypeScript também pode aumentar a produtividade, já que os recursos de autocompletar e verificação de tipo durante o desenvolvimento podem reduzir erros e agilizar a escrita do código.

**Escalabilidade e Arquitetura Moderna:** O ecossistema Node.js é conhecido por sua capacidade de dimensionar facilmente, permitindo que sua aplicação lide com um grande número de solicitações concorrentes. Além disso, você pode adotar abordagens modernas de arquitetura, como o uso de microsserviços, para desenvolver sistemas mais complexos e escalonáveis.


## RFC #2

Tema: Decisão de estrutura

Esta RFC propõe uma estrutura de projeto para a aplicação `currency-conversion-api` que prioriza o desacoplamento entre componentes e facilita a substituição de módulos individuais. A abordagem multiestágio e as boas práticas de arquitetura hexagonal garantirão a modularidade e escalabilidade da aplicação.

**Motivação**

Ao adotar uma abordagem que promova o desacoplamento e a substituição fácil de componentes, podemos responder às mudanças dos requisitos e tecnologias de forma ágil, sem impactar todo o sistema.

**Proposta**

```
project-folder/
  |- documents/
  |    |- convert.http
  |    |- ...
  |- src/
  |    |- application/
  |    |    |- use cases
  |    |    |- ...
  |    |- domain/
  |    |    |- customer-enity.ts
  |    |- config/
  |    |    |- logger
  |    |    |- ...
  |    |- infra/
  |    |    |- server
  |    |    |- ...
  |    |- shared/
  |    |    |- value objects
  |    |    |- ...
  |    |- main.ts

```

Esta estrutura reflete a organização modular da aplicação, com foco em manter o desacoplamento e facilitar a substituição de componentes. A descrição dos módulos é a seguinte:

**- controllers:** Contém os controladores responsáveis por lidar com a interação entre as solicitações e os _use cases_ de _application_.

**- domain/:** Este módulo abriga as regras de negócio relacionadas aa moeda. Essa camada inclui o serviços que encapsula a lógica de negócios e comportamentos.

**- applications/:** Representa a porta do mundo externo para o interno. É implementar a lógica de negócios da aplicação e coordenar a interação entre os diversos componentes do sistema.

**- infra/:** Camada interna e tem a responsabilidade de lidar com os detalhes de implementação e as interações com componentes externos.

**- main.ts:** Ponto de entrada da aplicação.

**Benefícios**

**- Desacoplamento:** A estrutura modular mantém as diferentes partes da aplicação isoladas, permitindo desenvolvimento independente e menos dependências.

**- Substituição de Componentes:** A modularidade facilita a substituição de módulos individuais, minimizando o impacto em outras partes do sistema.

**- Manutenção Fácil de Regras de Negócio:** Colocar as regras de negócio dentro do módulo de domínio promove uma organização clara e facilita a manutenção e evolução das regras.


# Sumário

- [Stack](#stack)
- [Instalação e execução da API](#instalação-e-execução-da-api)
- [Comandos adicionais](#comandos-adicionais)
- [Gerar imagem Docker](#gerar-imagem-docker)

# Stack

Para criação desse projeto utilizamos as seguintes bibliotecas e framework

- [TypeScript](https://www.typescriptlang.org/) - Linguagem fortemente tipada
- [Express](https://expressjs.com/pt-br/) - Framework web para Nodejs
- [Docker CE](https://www.docker.com/) - Plataforma de deploy
- [Jest](https://jestjs.io/pt-BR/docs/getting-started) - Framework de teste Javascript
- [OpenTelimetry](https://opentelemetry.io/) - Observabilidade

# Instalação e execução da API

### Use a mesma versão de node do projeto

Para execução deste step tenha [nvm](https://github.com/nvm-sh/nvm) instalado em sua máquina e execute os comandos abaixo:

```
  nvm use
```

### Instale as dependências do projeto

Utilize o [yarn](https://yarnpkg.com/):
Utilize o [npm](https://www.npmjs.com/)

```
  npm install
```

### Execute o projeto local

Então execute o seguinte comando. Para execução local. É preciso ter o Docker.

Tem uma `/documents` que contem os `curl` do endpoint para a API.

```
  npm run start:dev
```

# Comandos adicionais

### Teste

Para executar a stack de testes basta executar o seguinte comando:

```
  npm test
```

Para executar um teste específico fica assim:

```
  npm run test:unit
  npm run test:integration
  npm run test:cov
```

# Gerar imagem Docker

Este projeto contém uma imagem Docker para geração de **currency-conversion-api**.

## Pré-requisitos

Certifique-se de ter o Docker e [docker-compose](https://docs.docker.com/compose/install/) instalado em seu sistema.

1. Crie a imagem: 
```
  docker build -t currency-conversion-api .
```

## Configuração

- **PORT**: Porta na qual o servidor web ficará disponível (default: 3000);
- **NODE_ENV**: Definição de ambiente;
- **LOG_LEVEL**: Informa o level de registro de logs [ emerg, alert, crit, error, warning, notice, info, debug ] (default: info);
- **AWESOME_API**: API externa para consulta de câmbio de moeda `https://economia.awesomeapi.com.br`

Basta cópiar o arquivo `.env.example` e renomear para `.env`.

2. Construa um contâiner
```
docker-compose up
```
