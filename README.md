# Desafio Company Frontend

Desafio para buscar dados e fazer crud em API

## Stack utilizada

**Front-end:** React, Next.JS, TailwindCSS, Chakra UI

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/thonycsdev/company-frontend-challenge.git
```

Entre no diretório do projeto

```bash
  cd company-frontend-challenge
```

Instale a versão correta do node e suas as dependências

```bash
  nvm use && npm install
```

crie sua .env com as seguintes informações

```bash
  API_URL=http://143.198.144.154:5000/api/
  NEXT_PUBLIC_URL=http://localhost:3000/api/
  TOKEN = Bearer `Faca o login e cole o jwtToken aqui para rodar os testes automatizado, caso não for rodar, não vai precisar dessa variavel`
```

Inicie o projeto

```bash
  npm run dev
```

Iniciar testes

```bash
  npm run test
```
