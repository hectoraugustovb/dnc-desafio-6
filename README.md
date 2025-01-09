# DNC Desafio 6

## **Endpoints**

### **Usuários**

- **GET /users**
  - Retorna todos os usuários cadastrados.
  - **Exemplo de resposta:**
    ```json
    [
      {
	   "id": 1,
	   "cpf": 1234567890,
	   "name": "John",
	   "email": "John@gmail.com",
	   "phone": 1234567890,
	   "created_at": "2024-12-29T07:42:23.470Z",
	   "updated_at": "2024-12-29T07:42:23.470Z",
	   "orders": [],
	   "sales": [
	         {
	            "id": 2,
	            "buyer_id": 1,
	            "total_price": 260,
	            "created_at": "2024-12-29T07:47:44.705Z"
	         }
	   ]
      }
    ]
    ```

- **GET /users/:id**
  - Retorna os detalhes de um usuário específico.
  - **Parâmetros**:
    - `id`: ID do usuário (route param).


- **POST /users**
  - Cria um novo usuário.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `cpf`:
  - **Exemplo de resposta:**
    - Código de Status: `201 Created`
      - Descrição: Usuário criado com sucesso.


- **PUT /users**
  - Atualiza um usuário existente.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `cpf` (Dados atualizados).
  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Usuário atualizado com sucesso.


- **DELETE /users/:id**
  - Deleta um usuário.
  - **Parâmetros**:
    - `id`: ID do usuário (route param).
  - **Exemplo de resposta:**
      - **Exemplo de resposta**:
    - Código de Status: `200 OK`
      - Descrição: Usuário deletado com sucesso.

### **Produtos**

- **GET /products**
  - Retorna todos os produtos cadastrados.
  - **Exemplo de resposta:**
    ```json
    [
         {
            "id": 1,
            "name": "Mouse",
            "description": "Mouse",
            "price": 50,
            "created_at": "2024-12-30T12:17:13.956Z",
            "updated_at": "2024-12-30T12:17:13.956Z",
            "stock": {
                  "id": 1,
                  "product_id": 1,
                  "amount": 20,
                  "created_at": "2024-12-30T12:17:13.977Z",
                  "updated_at": "2024-12-30T12:17:13.977Z"
               }
          },
          {
             "id": 2,
             "name": "Keyboard",
             "description": "Keyboard",
             "price": 100,
             "created_at": "2024-12-30T12:17:13.956Z",
             "updated_at": "2024-12-30T12:17:13.956Z",
             "stock": {
                  "id": 2,
                  "product_id": 2,
                  "amount": 20,
                  "created_at": "2024-12-30T12:17:13.977Z",
                  "updated_at": "2024-12-30T12:17:13.977Z"
             }
         },
    ]
    ```

- **GET /products/:id**
  - Retorna os detalhes de um produto específico.
  - **Parâmetros**:
    - `id`: ID do produto (route param).


- **POST /products**
  - Cria um novo produto.
  - **Parâmetros**:
    - `name`, `price`, `description`, `amount`:
  - **Exemplo de resposta:**
    - Código de Status: `201 Created`
      - Descrição: Produto criado com sucesso.


- **PUT /products**
  - Atualiza um produto existente.
  - **Parâmetros**:
    - `name`, `price`, `description`, `amount` (Dados atualizados).
  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Produto atualizado com sucesso.


- **DELETE /products/:id**
  - Deleta um produto.
  - **Parâmetros**:
    - `id`: ID do usuário (route param).
  - **Exemplo de resposta:**
      - **Exemplo de resposta**:
    - Código de Status: `200 OK`
      - Descrição: Produto deletado com sucesso.


### **Vendas**

- **GET /sales**
  - Retorna todas as vendas cadastradas.
  - **Exemplo de resposta:**
    ```json
    [
         {
            "id": 2,
            "buyer_id": 1,
            "total_price": 260,
            "created_at": "2024-12-29T07:47:44.705Z",
            "client": {
               "id": 1,
               "cpf": 1234567890,
               "name": "John",
               "email": "John@gmail.com",
               "phone": 1234567890,
               "created_at": "2024-12-29T07:42:23.470Z",
               "updated_at": "2024-12-29T07:42:23.470Z"
             },
             "products": [
               {
                  "id": 1,
                  "name": "Mouse",
                  "description": "Mouse",
                  "price": 50,
                  "SalesProducts": {
                     "amount": 2
                  }
               },
               {
                  "id": 3,
                  "name": "Book",
                  "description": "Book",
                  "price": 80,
                  "SalesProducts": {
                     "amount": 2
                  }
               }
            ]
   	}
    ]
    ```

- **GET /sales/:id**
  - Retorna os detalhes de uma venda específica.
  - **Parâmetros**:
    - `id`: ID da venda (route param).


- **POST /sales**
  - Cria uma nova venda.
  - **Parâmetros**:
    - `client_id`, `products [{ "id": number, "amount": number }]`:
  - **Exemplo de resposta:**
    - Código de Status: `201 Created`
      - Descrição: Venda criada com sucesso.


- **DELETE /sales/:id**
  - Deleta uma venda.
  - **Parâmetros**:
    - `id`: ID da venda (route param).
  - **Exemplo de resposta:**
      - **Exemplo de resposta**:
    - Código de Status: `200 OK`
      - Descrição: Venda deletada com sucesso.
     

### **Pedidos**

- **GET /orders**
  - Retorna todos os pedidos cadastrados.
  - **Exemplo de resposta:**
    ```json
    [
         {
            "id": 1,
            "buyer_id": 1,
            "total_price": 260,
            "status": "pending",
            "created_at": "2024-12-30T11:59:22.985Z",
            "client": {
               "id": 1,
               "cpf": 12345678901,
               "name": "John",
               "email": "John@gmail.com",
               "phone": 12345678901,
               "created_at": "2024-12-30T11:40:24.756Z",
               "updated_at": "2024-12-30T11:40:24.756Z"
            },
            "products": [
               {
                  "id": 1,
                  "name": "Mouse",
                  "description": "Mouse",
                  "price": 50,
                  "OrdersProducts": {
                     "amount": 2
                  }
               },
               {
                  "id": 3,
                  "name": "Book",
                  "description": "Book",
                  "price": 80,
                  "OrdersProducts": {
                     "amount": 2
                  }
               }
            ]
   	}
    ]
    ```

- **GET /orders/:id**
  - Retorna os detalhes de um pedido específico.
  - **Parâmetros**:
    - `id`: ID do pedidos (route param).


- **POST /orders**
  - Cria um novo pedido.
  - **Parâmetros**:
    - `client_id`, `products [{ "id": number, "amount": number }]`:
  - **Exemplo de resposta:**
    - Código de Status: `201 Created`
      - Descrição: Pedido criado com sucesso.

     
- **PUT /orders**
  - Atualiza um pedido.
  - **Parâmetros**:
    - `id`, `status ('pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')`:
  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Pedido atualizado com sucesso.


- **DELETE /orders/:id**
  - Deleta um pedido.
  - **Parâmetros**:
    - `id`: ID do pedido (route param).
  - **Exemplo de resposta:**
      - **Exemplo de resposta**:
    - Código de Status: `200 OK`
      - Descrição: Pedido deletado com sucesso.
     
        

## Instalação

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/hectoraugustovb/dnc-desafio-6.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ./dnc-desafio-6
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure o banco de dados:

   ```bash
   npx sequelize-cli db:migrate | npx sequelize-cli db:seed:all
   ```

5. Inicie a aplicação:

   ```
   npm start
   ```

A aplicação pode ser testada a partir de alguma aplicação para efetuar as requisições, como Insomnia ou Postman.


RID: 166289
