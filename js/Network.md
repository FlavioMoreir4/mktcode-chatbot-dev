# Documentação da Classe Network

## Descrição

A classe `Network` foi projetada para simplificar o processo de requisições de rede usando JavaScript. Ela oferece métodos para consulta, inserção de dados e busca de informações adicionais.

---

## Métodos

### `_fetch(URL, data, headers)`

**Descrição**:\
Método auxiliar privado para realizar uma requisição de rede.\
**Parâmetros**:

-   `URL` (string) - A URL que será consultada.
-   `data` (Object|FormData) - Os dados da requisição.
-   `headers` (Object) - Headers adicionais para a requisição (Opcional; Padrão: {}).\
    **Retorno**:\
    Uma promessa com o resultado da consulta.

---

### `Consult({ URL, Data })`

**Descrição**:\
Consulta a URL informada com o método POST.\
**Parâmetros**:

-   `URL` (string) - A URL que será consultada.
-   `Data` (Object) - Um objeto contendo os dados da requisição.\
    **Retorno**:\
    Uma promessa com o resultado da consulta.

---

### `Insert(URL, Data)`

**Descrição**:\
Insere dados na URL informada com o método POST.\
**Parâmetros**:

-   `URL` (string) - A URL que receberá os dados.
-   `Data` (FormData) - Um objeto FormData contendo os dados a serem inseridos.\
    **Retorno**:\
    Uma promessa com o resultado da inserção.

---

### `fetchAdditionalInfo(Answers, url)`

**Descrição**:\
Busca informações adicionais e preenche no objeto Answers.\
**Parâmetros**:

-   `Answers` (Object) - O objeto onde as respostas serão armazenadas.
-   `url` (string) - A URL de onde buscar as informações (Opcional; Padrão: "<https://www.cloudflare.com/cdn-cgi/trace>").

---

## Exemplos de Uso

### Realizar uma Consulta

javascript

```js
const network = new Network();
const params = {
  URL: 'https://api.exemplo.com/consulta',
  Data: {
    chave: 'valor',
    outraChave: 'outroValor'
  }
};

network.Consult(params)
  .then(response => {
    console.log('Resposta da consulta:', response);
  })
  .catch(error => {
    console.log('Erro:', error);
  });`
```

### Inserir Dados

javascript

```js
const network = new Network();
const formData = new FormData();
formData.append('chave', 'valor');
formData.append('outraChave', 'outroValor');

network.Insert('https://api.exemplo.com/inserir', formData)
  .then(response => {
    console.log('Dados inseridos com sucesso:', response);
  })
  .catch(error => {
    console.log('Erro:', error);
  });
```

### Buscar Informações Adicionais

javascript

```js
const answers = {};
Network.fetchAdditionalInfo(answers)
  .then(() => {
    console.log('Informações adicionais:', answers);
  })
  .catch(error => {
    console.log('Erro:', error);
  });
```

Ou, com uma URL personalizada:

javascript

```js
const answers = {};
Network.fetchAdditionalInfo(answers, 'https://api.exemplo.com/info')
  .then(() => {
    console.log('Informações adicionais:', answers);
  })
  .catch(error => {
    console.log('Erro:', error);
  });
```

Espero que essa documentação te ajude a entender melhor como utilizar a classe `Network`. Se você tiver dúvidas adicionais ou encontrar algum erro, sinta-se à vontade para entrar em contato.
