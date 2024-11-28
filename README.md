# ProvaMarinke

# **Leonardo Node API**

Bem-vindo ao **Leonardo Node API**, um projeto desenvolvido para gerenciar contratos, pagamentos e tarefas. Esta API é responsável por fornecer endpoints para operações como **criação de contratos**, **gestão de pagamentos**, **gerenciamento de tarefas (jobs)** e muito mais.

---

## 🚀 **Começando**

Para começar a usar a API, basta clonar o repositório e seguir as instruções de instalação.

### **Passos para Instalação:**

1. Clone o repositório para o seu computador:
    ```bash
    git clone https://github.com/HermesLeonardo/profile-contracts-api
    ```

2. Acesse a pasta do projeto:
    ```bash
    cd profile-contracts-api
    ```

3. Instale as dependências necessárias:
    ```bash
    npm install
    ```

4. Verifique a criação da pasta **database** com o arquivo **database.sqllite**, caso esse diretorio não tenha sido criado, use o comando:

    ```bash
    npm start
    ```
---

## 🌱 **Inicializando o Banco de Dados (Se Necessário)**

Caso o banco de dados esteja vazio, você pode importar dados automaticamente para populá-lo. Para isso, temos rotas específicas que ajudam na inserção de dados de **Profiles**, **Contracts**, **Jobs**, **Deposits**, e **Payments**, mas você pode adicionar manualmente com as rotas adequadas.

---

## 💡 **Importando Dados no Banco de Dados**

Caso o banco de dados esteja vazio e você queira populá-lo com dados iniciais, use as rotas de **seed** que preparei para facilitar este processo.

### **1. Populando os Dados Iniciais**

Se o banco de dados estiver vazio e você quiser adicionar dados de exemplo, basta fazer uma requisição **POST** para a rota `/database/seed`. PS: Recomendo utilizar o **Postman**

**Rota:** `POST /database/seed`

Esta rota irá adicionar **Profiles**, **Contracts**, **Jobs**, **Deposits** e **Payments** automaticamente ao seu banco de dados.

#### Exemplo de Requisição:

```bash
POST http://localhost:3000/database/populate
```

##
## 🚀 **Agora vamos partir para o tutorial das rotas**



### **1. Listar todos os Contract de um determinado Profile**

**Rota:** `GET /contract/profile/:profileId`

Esta rota irá retornar todos os Contract de um determinado Profile que vc escolher, caso você tenha seguido a implementação do SqlLite, colocando o ID 1 como mostrado abaixo terá o seguinte retorno:

#### Exemplo de Requisição:

```bash
GET http://localhost:3000/contract/profile/1
```
***
**Saida esperada:**
```bash

{
    "profile": {
        "id": 1,
        "firstName": "Alice"
    },
    "contracts": [
        {
            "id": 1,
            "terms": "Consultoria",
            "clientId": 1,
            "contractorId": 2,
            "operationDate": "2024-11-01T00:00:00.000Z",
            "status": "ativo"
        },
        {
            "id": 6,
            "terms": "Consultoria em Software",
            "clientId": 1,
            "contractorId": 2,
            "operationDate": "2024-11-26T00:00:00.000Z",
            "status": "ativo"
        }
    ]
}
```
##

### 2. Realizar Deposit para Profile

**Rota:** `POST /deposit/profile/:profileId`

Esta rota irá adicionar um Depósito para o profile que você desejar, para isso, no postman, você precia acessar **Body** depois **Raw** e não esqueça de selecionar o modelo **JSON**  e colocar o valor desejado da seguinte maneira.

```bash
{
    "depositValue": 1000
}

```

caso você tenha seguido a implementação do SqlLite, colocando o ID 1 como mostrado abaixo terá o seguinte retorno:

#### Exemplo de Requisição:

```bash
POST http://localhost:3000/deposit/profile/1
```
***
**Saida esperada:**
```bash

{
    "message": "Depósito realizado com sucesso.",
    "deposit": {
        "id": 6,
        "clientId": 1,
        "depositValue": 1000,
        "operationDate": "2024-11-26T23:48:46.846Z"
    },
    "updatedProfile": {
        "id": 1,
        "balance": 6000
    }
}
```
##

### **3. Listar todos os Jobs de um Contract que não foram pagos integralmente**

**Rota:** `GET /job/contract/:contractId/unpaid`

Esta rota irá retornar os , 

caso você tenha seguido a implementação do SqlLite, colocando o ID 1 como mostrado abaixo terá o seguinte retorno:

#### Exemplo de Requisição:

```bash
GET http://localhost:3000/job/contract/1/unpaid
```
***
**Saida esperada:**
```bash

[
    {
        "id": 1,
        "contractId": 1,
        "description": "Revisão de Arquitetura",
        "operationDate": "2024-11-02T00:00:00.000Z",
        "paymentDate": null,
        "price": 2000,
        "paid": false,
        "payments": [
            {
                "id": 1,
                "jobId": 1,
                "operationDate": "2024-11-05T00:00:00.000Z",
                "paymentValue": 1500
            }
        ]
    },
    {
        "id": 2,
        "contractId": 1,
        "description": "Consultoria Técnica",
        "operationDate": "2024-11-06T00:00:00.000Z",
        "paymentDate": null,
        "price": 1500,
        "paid": false,
        "payments": [
            {
                "id": 2,
                "jobId": 2,
                "operationDate": "2024-11-09T00:00:00.000Z",
                "paymentValue": 500
            }
        ]
    }
]
```
##

**Pronto, Agora os testes sem nehum problema**

## 📚 Documentação Adicional
Se você precisar de mais informações ou detalhes sobre o funcionamento interno da API:

Consulte os comentários no código para entender a lógica de cada rota e função.
Verifique a configuração do SQLite no arquivo de banco de dados, caso queira personalizar ou integrar com outro sistema de banco de dados.
##
  

 <h3> ════════ 📞 CONTATO ════════</h2>


**Para dúvidas ou sugestões, entre em contato:**

Nome: Leonardo Hermes de Carvalho

Email: leohermescarvalho18@gmail.com

GitHub: github.com/HermesLeonardo

Obrigado por usar o Leonardo Node API! 😊

##