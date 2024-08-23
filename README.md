# Projeto Stefanini Frontend

Este é o frontend do Projeto Stefanini, desenvolvido em Angular. O projeto foi criado para gerenciar pedidos e produtos, com funcionalidades para criar, editar, listar e excluir pedidos e produtos.

## Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Angular CLI**: Para instalar o Angular CLI, execute o comando:
  
  ```bash
  npm install -g @angular/cli

## Configuração do Ambiente

Este projeto utiliza uma variável de ambiente para definir a URL da API backend. Essa configuração está localizada no arquivo src/environments/environment.ts.
Estrutura do arquivo environment.ts

  ```bash
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44347/api'  // URL da API backend
};
```

## Backend (API)

O backend deste projeto foi desenvolvido em C# (.NET Core) (https://github.com/igormieski27/ProjetoStefaniniAPI) e está configurado para aceitar requisições CORS apenas do endereço específico onde o frontend está rodando. No arquivo Program.cs, a configuração do CORS foi feita da seguinte forma:
```bash
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // URL DO FRONTEND AQUI
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
```

### Screenshots: 
Listagem de Pedidos:
![image](https://github.com/user-attachments/assets/6489b035-1902-4970-b42b-920f66d71623)
Listagem de Produtos:
![image](https://github.com/user-attachments/assets/1f7435e6-39b7-42cf-bd47-bd5ba9db33dc)

