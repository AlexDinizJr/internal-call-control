# Internal Call Control API + Frontend

Autor: Alex Diniz

Projeto fullstack para gerenciamento de chamados técnicos, com backend em .NET e frontend em React (Vite), containerizado com Docker. O projeto se trata de um desafio técnico para a empresa Codificar.

---

## Tecnologias

### Backend
- .NET (ASP.NET Core Web API)
- EF (Entity Framework Core)
- SQLite

### Frontend
- React + TypeScript + Vite
- Tailwind CSS
- Axios

### Infra
- Docker

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/AlexDinizJr/internal-call-control.git
cd internal-call-control
```

### 2. Configure variáveis de ambiente (frontend)

```bash
cp frontend/.env.example frontend/.env
```

A variável `VITE_API_URL` define a URL base da API backend.

Exemplo:
http://localhost:5066/api (No meu ambiente, a API está rodando na porta 5066.)

Para descobrir a URL do backend, verifique o terminal ao iniciar a API. Ela normalmente aparece como:

"Now listening on: http://localhost:5066"

### 3. Execução do Projeto

#### Com o Docker
Caso o Docker esteja instalado rode o comando:

```bash
docker compose up --build
```

#### Sem o Docker

Caso não seja possível utilizar o docker, é necessário ter a SDK 10.0 do .NET e o Node.js (versão LTS recomendada). Com isso, será necessário instalar as dependências:

Backend:
```bash
cd api
dotnet restore
dotnet build
dotnet watch run
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

### 4. Testando o projeto

Normalmente os acessos ficaram dispostos no terminal, mas provavelmente será algo como:

- Frontend:: http://localhost:5173
- Backend (Swagger): http://localhost:5066/swagger

O projeto utiliza SQLite, com o arquivo app.db versionado e já populado com seed de dados.

A escolha do SQLite foi feita por:

- simplicidade de setup
- leveza
- facilidade para testes locais

---

## Arquitetura

O projeto segue uma separação simples em duas camadas principais:

### Backend (.NET API)
- API REST responsável pela regra de negócio
- Utiliza Entity Framework Core para acesso ao banco de dados
- Banco de dados SQLite para persistência local
- Estrutura baseada em Controllers, Interfaces e Repositories

### Frontend (React)
- Aplicação SPA construída com Vite
- Componentizada e modularizada
- Consome a API via Axios
- Responsável pela camada de interface e interação com o usuário

### Decisões técnicas

- SQLite foi escolhido por simplicidade e facilidade de setup local
- Docker utilizado para padronizar o ambiente de execução
- Vite adotado por performance no desenvolvimento frontend
- .NET e React foram escolhidos principalmente pela familiaridade do autor com essas tecnologias
- A construção da interface foi acelerada com o uso de ferramentas de geração assistida (Codex), após a estruturação dos componentes e integração com a API
---

## Observações

Ao longo da implementação, foram feitas adaptações em relação ao planejamento inicial.

Segue o protótipo conceitual do sistema: https://excalidraw.com/#json=cr2qZBPLUL94kPQhp1wsi,GKIjztP1_tUtHEIgzFI4CA