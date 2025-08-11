📋 Employee Manager Front
Employee Manager Front é uma aplicação web para gerenciamento de funcionários, com autenticação diferenciada para administradores e funcionários.
O sistema permite o CRUD completo (criação, leitura, atualização e exclusão) de registros de funcionários e o upload de fotos de perfil.

🚀 Funcionalidades
Autenticação de usuários:

- Admin: acesso a todos os recursos e funcionalidades.

- Funcionário: acesso restrito às suas próprias informações.

Gerenciamento de funcionários:

- Criar, listar, editar e excluir registros.

- Visualizar detalhes do funcionário.

Upload de fotos:

- Adicionar ou alterar a foto do funcionário.

Interface intuitiva:

- Layout responsivo.

- Organização em cards para melhor visualização.

Segurança:

- Rotas protegidas por autenticação.

- Diferenciação de permissões conforme o tipo de usuário.

🛠️ Tecnologias Utilizadas

- Front-end: React + Tailwind CSS

- Roteamento: React Router

- Gerenciamento de estado: React Hooks (useState, useEffect)

- Upload de arquivos: Componente personalizado integrado ao formulário

- Integração com back-end: API REST em C# .NET (Employee Manager API)

📂 Estrutura do Projeto

employee-manager-front/
├── src/
│   ├── assets/           # Imagens e ícones
│   ├── components/       # Componentes reutilizáveis (Header, Form, Card, etc.)
│   ├── hooks/            # Hooks personalizados (ex: useAuth, useRegister)
│   ├── pages/            # Páginas principais (Login, Register, Home, etc.)
│   ├── routes/           # Configuração de rotas e rotas protegidas
│   ├── services/         # Conexão com API (authService, employeeService, etc.)
│   ├── styles/           # Arquivos de estilo globais e configurações do Tailwind
│   ├── types/            # Tipagens e interfaces TypeScript
│   ├── App.jsx           # Roteamento principal
│   └── main.jsx          # Ponto de entrada
├── public/
│   ├── favicon.ico       # Ícone do site
│   └── index.html
└── package.json


⚙️ Instalação e Execução

1️⃣ Clonar o repositório
  git clone https://github.com/seu-usuario/employee-manager-front.git
  cd employee-manager-front
2️⃣ Instalar dependências
  npm install
3️⃣ Configurar variáveis de ambiente
Crie um arquivo .env na raiz do projeto e configure:
  VITE_API_BASE_URL=http://localhost:5000/api
4️⃣ Executar o projeto
  npm run dev
O projeto estará disponível em http://localhost:5173


🔑 Fluxo de Autenticação

- O usuário faz login informando e-mail e senha.

- O sistema identifica o tipo de usuário (admin ou funcionário).

- As permissões são aplicadas conforme o papel do usuário.

- A navegação é protegida por rotas privadas.

🖼️ Upload de Fotos

- O upload pode ser feito no cadastro ou edição do funcionário.

- As imagens são armazenadas no servidor via API.