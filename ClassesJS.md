# Documentação da Classe Utils

## Descrição Geral

A classe `Utils` é uma coleção estática de métodos utilitários que oferece várias funcionalidades úteis para manipulação de URL, cookies, strings, arrays, objetos e elementos DOM.

---

## Métodos

### `getURLParameter(paramName)`

#### Descrição

Retorna o valor de um parâmetro específico na URL.

#### Parâmetros

-   `paramName`: Nome do parâmetro.

#### Retorno

-   Valor do parâmetro ou `false` se não encontrado.

#### Exemplo de Uso

javascript

```js
const userId = Utils.getURLParameter('userId');
console.log(userId); // Saída: valor do userId ou false
```

---

### `getAllURLParameters()`

#### Descrição

Retorna todos os parâmetros da URL como um objeto.

#### Retorno

-   Objeto com os parâmetros.

#### Exemplo de Uso

javascript

```js
const params = Utils.getAllURLParameters();
console.log(params); // Saída: Objeto com todos os parâmetros
```

---

### `convertParamsToObject(paramString)`

#### Descrição

Converte uma string de parâmetros em um objeto associativo.

#### Parâmetros

-   `paramString`: String de parâmetros.

#### Retorno

-   Objeto associativo.

#### Exemplo de Uso

javascript

```js
const paramsObj = Utils.convertParamsToObject('key1=value1&key2=value2');
console.log(paramsObj); // Saída: { key1: 'value1', key2: 'value2' }
```

---

### `convertCookiesToObject(cookieString)`

#### Descrição

Converte uma string de cookies em um objeto associativo.

#### Parâmetros

-   `cookieString`: String de cookies.

#### Retorno

-   Objeto associativo.

#### Exemplo de Uso

javascript

```js
const cookiesObj = Utils.convertCookiesToObject('username=John; age=30');
console.log(cookiesObj); // Saída: { username: 'John', age: '30' }
```

---

### `getAllCookies()`

#### Descrição

Retorna os cookies da página como um objeto.

#### Retorno

-   Objeto com os cookies.

#### Exemplo de Uso

javascript

```js
const allCookies = Utils.getAllCookies();
console.log(allCookies); // Saída: Objeto com todos os cookies
```

---

### `capitalizeWords(str)`

#### Descrição

Converte a primeira letra de cada palavra para maiúscula.

#### Parâmetros

-   `str`: String para converter.

#### Retorno

-   String convertida.

#### Exemplo de Uso

javascript

```js
const capitalized = Utils.capitalizeWords('hello world');
console.log(capitalized); // Saída: 'Hello World'
```

---

### `generateUniqueId(length = 16)`

#### Descrição

Gera um ID único.

#### Parâmetros

-   `length`: Comprimento do ID. Padrão é 16.

#### Retorno

-   ID único.

#### Exemplo de Uso

javascript

```js
const uniqueId = Utils.generateUniqueId();
console.log(uniqueId); // Saída: um ID único
```

---

### `maskInput(input, masks)`

#### Descrição

Adiciona máscara a um elemento de entrada de texto.

#### Parâmetros

-   `input`: Elemento de entrada de texto.
-   `masks`: Lista de máscaras.

#### Exemplo de Uso

javascript

```js
const inputElement = document.getElementById('phoneInput');
Utils.maskInput(inputElement, ['(00) 0000-0000', '(00) 00000-0000']);
```

---

### `shuffleArray(arr)`

#### Descrição

Embaralha um array de forma aleatória.

#### Parâmetros

-   `arr`: O array a ser embaralhado.

#### Retorno

-   O array embaralhado.

#### Exemplo de Uso

javascript

```js
const shuffled = Utils.shuffleArray([1, 2, 3, 4, 5]);
console.log(shuffled); // Saída: array embaralhado
```

---

### `unique(arr)`

#### Descrição

Remove elementos duplicados de um array.

#### Parâmetros

-   `arr`: O array original.

#### Retorno

-   Um novo array sem duplicatas.

#### Exemplo de Uso

javascript

```js
const uniqueArr = Utils.unique([1, 2, 2, 3, 4, 4, 5]);
console.log(uniqueArr); // Saída: [1, 2, 3, 4, 5]
```

---

### `truncateString(str, length)`

#### Descrição

Encurta uma string para um determinado comprimento.

#### Parâmetros

-   `str`: A string original.
-   `length`: O comprimento máximo da string.

#### Retorno

-   A string encurtada.

#### Exemplo de Uso

javascript

```js
const truncated = Utils.truncateString('Hello, world!', 5);
console.log(truncated); // Saída: 'Hell...'
```

---

### `escapeHTML(str)`

#### Descrição

Escapa caracteres especiais para uso em HTML.

#### Parâmetros

-   `str`: A string a ser escapada.

#### Retorno

-   A string escapada.

#### Exemplo de Uso

javascript

```js
const escaped = Utils.escapeHTML('<div>Hello</div>');
console.log(escaped); // Saída: '&lt;div&gt;Hello&lt;/div&gt;'
```

---

### `deepClone(obj)`

#### Descrição

Clona um objeto profundamente.

#### Parâmetros

-   `obj`: O objeto a ser clonado.

#### Retorno

-   Uma cópia profunda do objeto.

#### Exemplo de Uso

javascript

```js
const original = { a: 1, b: { c: 2 } };
const clone = Utils.deepClone(original);
console.log(clone); // Saída: { a: 1, b: { c: 2 } }
```

---

### `mergeObjects(...objs)`

#### Descrição

Mescla dois ou mais objetos.

#### Parâmetros

-   `...objs`: Os objetos a serem mesclados.

#### Retorno

-   Um novo objeto contendo todas as propriedades dos objetos originais.

#### Exemplo de Uso

javascript

```js
const merged = Utils.mergeObjects({ a: 1 }, { b: 2 }, { c: 3 });
console.log(merged); // Saída: { a: 1, b: 2, c: 3 }
```

---

### `isEmptyObject(obj)`

#### Descrição

Verifica se um objeto está vazio.

#### Parâmetros

-   `obj`: O objeto a ser verificado.

#### Retorno

-   `true` se o objeto estiver vazio, `false` caso contrário.

#### Exemplo de Uso

javascript

```js
const isEmpty = Utils.isEmptyObject({});
console.log(isEmpty); // Saída: true
```

---

### `getElement(selector)`

#### Descrição

Retorna um elemento DOM com base em um seletor, mas inclui verificação de erro.

#### Parâmetros

-   `selector`: O seletor do elemento DOM.

#### Retorno

-   O elemento DOM ou `null` se não encontrado.

#### Exemplo de Uso

javascript

```js
const element = Utils.getElement('#myId');
console.log(element); // Saída: o elemento DOM ou null
```

---

### `toggleVisibility(element)`

#### Descrição

Alterna a visibilidade de um elemento DOM.

#### Parâmetros

-   `element`: O elemento DOM ou o seletor do elemento.

#### Exemplo de Uso

javascript

```js
Utils.toggleVisibility('#myId');
```

---

Esta documentação cobre a classe `Utils` de forma completa, incluindo exemplos de uso para cada método. Espero que você ache isso útil!

Documentação da Classe CookieAndURLManager
==========================================

Descrição Geral
---------------

A classe `CookieAndURLManager` é responsável por gerenciar cookies e parâmetros de URL. Oferece métodos estáticos para preencher um objeto de respostas com informações obtidas a partir de cookies ou parâmetros de URL.

* * * * *

Métodos
-------

### `fillAnswersFromURLParameters(Answers)`

#### Descrição

Preenche o objeto `Answers` com parâmetros vindos da URL.

#### Parâmetros

-   `Answers`: Objeto onde as respostas serão armazenadas.

#### Exemplo de Uso

js

```js
const Answers = {};
CookieAndURLManager.fillAnswersFromURLParameters(Answers);
console.log(Answers); // Saída: Objeto preenchido com parâmetros da URL
```

* * * * *

### `fillAnswersFromCookies(Answers)`

#### Descrição

Preenche o objeto `Answers` com valores vindos dos cookies.

#### Parâmetros

-   `Answers`: Objeto onde as respostas serão armazenadas.

#### Exemplo de Uso

js

```js
const Answers = {};
CookieAndURLManager.fillAnswersFromCookies(Answers);
console.log(Answers); // Saída: Objeto preenchido com valores de cookies
```

* * * * *

Documentação da Classe EventTracker
===================================

Descrição Geral
---------------

A classe `EventTracker` é responsável por gerenciar o envio de eventos para diferentes plataformas de análise, como Google Tag Manager e Facebook Ads.

* * * * *

Métodos
-------

### `sendGTMEvent(event, data)`

#### Descrição

Envia um evento para o Google Tag Manager.

#### Parâmetros

-   `event`: Nome do evento.
-   `data`: Dados adicionais a serem enviados (opcional).

#### Exemplo de Uso

js

```js
EventTracker.sendGTMEvent("clickButton", {buttonID: "submit"});
```

* * * * *

### `sendFBStandardEvent(event, data, options)`

#### Descrição

Envia um evento padrão para o Facebook Ads.

#### Parâmetros

-   `event`: Nome do evento.
-   `data`: Dados adicionais a serem enviados (opcional).
-   `options`: Opções adicionais (opcional).

#### Exemplo de Uso

js

```js
EventTracker.sendFBStandardEvent("Purchase", {value: 50}, {currency: "USD"});
```

* * * * *

Documentação da Classe Logger
=============================

Descrição Geral
---------------

A classe `Logger` oferece uma interface para a geração de logs com diferentes níveis de importância.

* * * * *

Métodos
-------

### `setMinLogLevel(level)`

#### Descrição

Define o nível mínimo de log.

#### Parâmetros

-   `level`: Nível de log a ser definido.

#### Exemplo de Uso

js

```js
const logger = new Logger();
logger.setMinLogLevel("info");
```

* * * * *

### `log(level, message, ...params)`

#### Descrição

Faz log da mensagem e parâmetros com base no nível fornecido.

#### Parâmetros

-   `level`: Nível de log.
-   `message`: Mensagem a ser logada.
-   `params`: Parâmetros adicionais (opcional).

#### Exemplo de Uso

js

```js
const logger = new Logger();
logger.log("info", "This is an info message", {extra: "data"});
```

* * * * *

Espero que esta organização seja mais útil!