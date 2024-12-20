# Projeto: Sistema Fullstack com React, .NET e Docker

## Descrição
Este projeto é um sistema fullstack desenvolvido com as seguintes tecnologias:
- **Front-end**: React
- **Back-end**: ASP.NET Core
- **Banco de Dados**: SQL Server
- **Contêinerização**: Docker e Docker Compose

O objetivo é criar uma aplicação escalável e moderna, com separação clara entre as camadas de front-end e back-end.

---

## Estrutura do Projeto
```
├── frontend/       # Código do front-end em React
├── backend/        # Código do back-end em .NET Core
├── docker-compose.yml
└── .env            # Variáveis de ambiente sensíveis
```

---

## Tecnologias Utilizadas
### Front-end
- React
- Axios (para requisições HTTP)
- React Router DOM (para navegação)

### Back-end
- ASP.NET Core
- Entity Framework Core (ORM)
- SQL Server (banco de dados)

### Contêinerização
- Docker
- Docker Compose

---

## Configuração do Ambiente

### Requisitos Pré-requisitos:
- Docker e Docker Compose instalados
- Node.js e NPM instalados (opcional para desenvolvimento local do front-end)
- .NET SDK instalado (opcional para desenvolvimento local do back-end)

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:
```env
# Banco de Dados
DB_PASSWORD=YourPassword123
DB_USER=sa
DB_NAME=appdb
DB_HOST=db
```

---

## Instalação e Execução

### 1. Subir os Contêineres com Docker Compose
Execute o seguinte comando na raiz do projeto:
```bash
docker-compose up --build
```
Isso irá:
- Construir o front-end em React
- Construir o back-end em .NET Core
- Configurar o banco de dados SQL Server

### 2. Acessar os Serviços
- **Front-end**: [http://localhost:3000](http://localhost:3000)
- **Back-end**: [http://localhost:5000](http://localhost:5000)

---

## Funcionalidades
- CRUD de tarefas no back-end:
  - Listar tarefas
  - Criar nova tarefa
  - Atualizar tarefa existente
  - Excluir tarefa
- Integração entre front-end e back-end via API REST

---

## Estrutura do Back-end

### Entidade: Task
```csharp
public class Task
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
}
```

### Endpoints da API
- `GET /api/tasks`: Lista todas as tarefas
- `GET /api/tasks/{id}`: Retorna uma tarefa por ID
- `POST /api/tasks`: Cria uma nova tarefa
- `PUT /api/tasks/{id}`: Atualiza uma tarefa existente
- `DELETE /api/tasks/{id}`: Exclui uma tarefa

---

## Estrutura do Front-end

### Diretórios
```
frontend/
├── src/
│   ├── components/   # Componentes reutilizáveis
│   ├── app/          # Rota taiz
│   ├── services/     # Configuração de API com Axios
└── public/
```

### Principais Funcionalidades
- Interface amigável para gerenciar tarefas
- Conexão com a API para exibir e manipular dados

---

## Desenvolvimento Local

### 1. Rodar o Front-end Localmente
1. Navegue até a pasta `frontend/`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm start
   ```

### 2. Rodar o Back-end Localmente
1. Navegue até a pasta `backend/`:
   ```bash
   cd backend
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   dotnet run
   ```

### 3. Configurar Banco de Dados
Certifique-se de que o SQL Server esteja rodando no Docker ou localmente. Atualize a string de conexão no arquivo `appsettings.json`.