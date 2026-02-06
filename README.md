# Reading Control API

Este é o backend do sistema de controle de leitura, desenvolvido com **Node.js**, **TypeScript**, **Express** e **Prisma**.

---

## Tecnologias Utilizadas

- **Runtime:** Node.js (v20+ recomendado)
- **Linguagem:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (via Docker)
- **Autenticação:** JWT (JSON Web Token)
- **Criptografia:** BcryptJS
- **Validação:** Zod

---

## Como Iniciar o Projeto

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

### 2. Configuração do Banco de Dados
O projeto utiliza o Docker para rodar o PostgreSQL.

1. Navegue até a pasta `db`:
   ```bash
   cd db
   ```
2. Suba o container do banco de dados:
   ```bash
   docker-compose up -d
   ```
O banco estará disponível na porta `5432`.

---

### 3. Instalação de Dependências
Navegue até a pasta `api` e instale os pacotes:

```bash
cd ../api
npm install
```

---

### 4. Variáveis de Ambiente
Crie um arquivo `.env` na raiz da pasta `api` (ou edite o existente) com as seguintes configurações:

```env
PORT=3333
DATABASE_URL="postgresql://admin:admin123@localhost:5432/reading-control?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
```

> **Nota:** Se você mudou as credenciais no `docker-compose.yml`, ajuste a `DATABASE_URL` adequadamente.

---

### 5. Migrations do Prisma
Execute o comando abaixo para criar as tabelas no banco de dados e gerar o Prisma Client:

```bash
npx prisma migrate dev
```

---

### 6. Rodando o Servidor
Para iniciar o projeto em modo de desenvolvimento:

```bash
npm run dev
```
O servidor estará rodando em `http://localhost:3333`.

---

## Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala todas as dependências do projeto. |
| `npm run dev` | Inicia o servidor de desenvolvimento com `tsx watch`. |
| `npx prisma migrate dev` | Cria uma nova migration e atualiza o banco de dados. |
| `npx prisma studio` | Abre a interface visual do Prisma para gerenciar dados. |
| `npx prisma generate` | Gera o cliente do Prisma baseado no schema. |

---

## Rotas da API

Todas as rotas (exceto `/register` e `/login`) exigem um header de autorização com o Token JWT:
`Authorization: Bearer <seu_token>`

### Usuários
- **POST** `/register`
  - **Descrição:** Cadastro de novos usuários.
  - **Body:** `{ "name": "...", "email": "...", "password": "..." }`
  - **Retorno:** `{ "id": "...", "name": "...", "email": "..." }`

- **POST** `/login`
  - **Descrição:** Autenticação de usuários.
  - **Body:** `{ "email": "...", "password": "..." }`
  - **Retorno:** `{ "id": "...", "name": "...", "email": "...", "token": "..." }`

- **GET** `/me`
  - **Descrição:** Retorna os dados do usuário autenticado.
  - **Retorno:** `{ "id": "...", "name": "...", "email": "..." }`

### Livros
- **POST** `/book`
  - **Descrição:** Cadastro de um novo livro.
  - **Body:** `{ "title": "...", "author": "...", "genre": "...", "pages": 123, "cover_url": "...", "google_book_id": "..." }`
  - **Retorno:** Objeto completo do livro criado.

- **GET** `/book`
  - **Descrição:** Lista todos os livros cadastrados pelo usuário logado.
  - **Retorno:** Array de objetos de livros.

- **GET** `/book/details`
  - **Descrição:** Busca detalhes de um livro específico.
  - **Query Params:** `id=<book_id>`
  - **Retorno:** Objeto detalhado do livro.

### Sessões de Leitura
- **POST** `/reading-session`
  - **Descrição:** Inicia ou registra uma sessão de leitura.
  - **Body:** `{ "book_id": "...", "current_page": 10 }`
  - **Retorno:** Objeto da sessão de leitura criada.


---

## Estrutura de Pastas (API)

- `src/controllers`: Lógica de entrada/saída das requisições.
- `src/services`: Regras de negócio da aplicação.
- `src/middlewares`: Filtros e autenticação de rotas.
- `src/prisma`: Configuração do cliente do banco de dados.
- `src/schemas`: Validação de dados (Zod).
- `prisma/`: Schema e migrations do banco de dados.
