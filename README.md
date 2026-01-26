# 📊 Sistema de Relatório de Vendas

Sistema completo de gerenciamento e visualização de relatórios de vendas, desenvolvido com React no frontend e Node.js/Express no backend, utilizando Prisma ORM e MySQL.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com **Express** - Servidor HTTP
- **TypeScript** - Tipagem estática
- **Prisma ORM** - Gerenciamento de banco de dados
- **MySQL/MariaDB** - Banco de dados relacional
- **CORS** - Comunicação frontend/backend

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Estilização
- **TanStack Table** - Tabelas reativas
- **jsPDF** - Exportação de PDF
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
relatorio-de-vendas/
├── relatorio-de-vendas-backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schema do banco de dados
│   │   ├── seed.ts                # Dados iniciais
│   │   └── migrations/            # Migrações do banco
│   ├── src/
│   │   ├── controllers/           # Lógica de negócio
│   │   │   └── relatorio.controller.ts
│   │   ├── routes/                # Definição de rotas
│   │   │   └── relatorio.routes.ts
│   │   ├── lib/                   # Utilitários
│   │   │   └── prisma.ts
│   │   └── index.ts               # Entrada do servidor
│   └── package.json
│
└── relatorio-de-vendas-frontend/
    ├── src/
    │   ├── components/            # Componentes React
    │   │   ├── Filtros.tsx
    │   │   └── VendasTable.tsx
    │   ├── services/              # Comunicação com API
    │   │   └── api.ts
    │   ├── utils/                 # Funções auxiliares
    │   │   └── pdf.ts
    │   ├── App.tsx                # Componente principal
    │   ├── main.tsx               # Entrada da aplicação
    │   └── types.ts               # Tipos TypeScript
    └── package.json
```

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (v18 ou superior)
- **pnpm** (gerenciador de pacotes)
- **MySQL** ou **MariaDB**
- **Git** (opcional, para clonar o repositório)

### Instalação do pnpm (caso não tenha)

```bash
npm install -g pnpm
```

## ⚙️ Configuração e Instalação

### 1️⃣ Backend

#### 1.1 Navegue até a pasta do backend

```bash
cd relatorio-de-vendas-backend
```

#### 1.2 Inicie o serviço MySQL (Fedora/RHEL)

```bash
sudo systemctl start mysqld
```

> **Nota:** Para outras distribuições Linux:
> - **Ubuntu/Debian:** `sudo systemctl start mysql`
> - **Arch:** `sudo systemctl start mariadb`
> - **Windows:** Inicie o serviço MySQL pelo Painel de Controle
> - **macOS:** `brew services start mysql`

#### 1.3 Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `relatorio-de-vendas-backend`:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/vendas_db"
DATABASE_USER="usuario"
DATABASE_PASSWORD="senha"
DATABASE_NAME="vendas_db"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

> **Importante:** Substitua `usuario` e `senha` pelas credenciais do seu MySQL.

#### 1.4 Instale as dependências

```bash
pnpm install
```

#### 1.5 Gere o Prisma Client

```bash
pnpm dlx prisma generate
```

#### 1.6 Execute as migrações e popule o banco

```bash
# Cria as tabelas no banco de dados
pnpm dlx prisma migrate dev

# Popula o banco com 10 registros de exemplo
pnpm run seed
```

#### 1.7 Inicie o servidor backend

```bash
pnpm run dev
```

O servidor estará rodando em: **http://localhost:3001**

---

### 2️⃣ Frontend

#### 2.1 Abra um novo terminal e navegue até a pasta do frontend

```bash
cd relatorio-de-vendas-frontend
```

#### 2.2 Instale as dependências

```bash
pnpm install
```

#### 2.3 Inicie o servidor de desenvolvimento

```bash
pnpm run dev
```

O frontend estará disponível em: **http://localhost:5173**

## 🎯 Funcionalidades

- ✅ **Listagem de Vendas** - Visualize todas as vendas cadastradas
- 🔍 **Filtros Avançados**:
  - Busca por nome do produto
  - Filtro por categoria
  - Filtro por período (data início e fim)
- 📄 **Exportação PDF** - Exporte relatórios filtrados em PDF
- 📊 **Tabela Responsiva** - Visualização otimizada para diferentes telas
- 🎨 **Interface Moderna** - Design clean com TailwindCSS

## 📖 Como Usar

1. **Acesse o sistema** pelo navegador em `http://localhost:5173`
2. **Aplique filtros** conforme necessário:
   - Digite o nome do produto no campo "Produto"
   - Selecione uma categoria no dropdown
   - Defina período usando os campos de data
3. **Clique em "Filtrar"** para aplicar os filtros
4. **Clique em "Limpar"** para resetar os filtros
5. **Clique em "Exportar PDF"** para baixar o relatório

## 🗄️ Estrutura do Banco de Dados

### Tabela: `Venda`

| Campo       | Tipo     | Descrição                    |
|-------------|----------|------------------------------|
| id          | Int      | ID único (autoincremento)    |
| produto     | String   | Nome do produto              |
| categoria   | String   | Categoria do produto         |
| quantidade  | Int      | Quantidade vendida           |
| valorTotal  | Decimal  | Valor total da venda         |
| dataVenda   | DateTime | Data da venda                |

## 🔄 Comandos Úteis

### Backend

```bash
# Visualizar banco de dados com interface gráfica
pnpm dlx prisma studio

# Resetar banco de dados (cuidado!)
pnpm dlx prisma migrate reset

# Verificar status das migrações
pnpm dlx prisma migrate status

# Rodar seed novamente
pnpm run seed
```

### Frontend

```bash
# Build para produção
pnpm run build

# Preview da build de produção
pnpm run preview
```

## 🐛 Troubleshooting

### Erro de conexão com o banco

- Verifique se o MySQL está rodando: `sudo systemctl status mysqld`
- Confirme as credenciais no arquivo `.env`
- Certifique-se que o banco de dados existe ou será criado automaticamente

### Porta 3001 ou 5173 já em uso

- Backend: Altere a porta em `relatorio-de-vendas-backend/src/index.ts`
- Frontend: Altere em `relatorio-de-vendas-frontend/vite.config.ts`

### Erro "Prisma Client não foi gerado"

```bash
cd relatorio-de-vendas-backend
pnpm dlx prisma generate
```

## 👨‍💻 Desenvolvedor

Desenvolvido como projeto de demonstração de sistema full-stack com React e Node.js.

## 📝 Licença

Este projeto é de código aberto e está disponível para uso educacional.

---

**Dúvidas?** Abra uma issue ou entre em contato! 🚀
