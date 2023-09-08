# Documentação da Classe ChatBot

## Descrição Geral

A classe `ChatBot` oferece uma interface interativa para perguntas e respostas. Ela cuida da lógica de apresentação das perguntas, coleta de respostas e manutenção do histórico do chat.

## Dependências

-   A classe espera que elementos com os IDs `#mkt-chatbot-icon` e `#mkt-chatbot` estejam presentes no DOM.
-   Classe `Logger`: Utilizada para registrar eventos e erros.

---

## Métodos

### `constructor()`

#### Descrição

O construtor da classe `ChatBot` realiza várias inicializações importantes para o funcionamento do chatbot.

#### Parâmetros

Não são necessários parâmetros para inicializar uma instância desta classe.

#### Exemplo de uso

javascript

```js
const chatBot = new ChatBot();
```

#### Detalhes de Implementação

No momento da construção, o construtor tenta:

-   Inicializar uma instância de `Logger` para controle de logs.
-   Chamar `initDOMElements()` para inicializar os elementos do DOM necessários.
-   Chamar `initDOMEvents()` para inicializar os eventos do DOM.
-   Inicializar `this.questions` como um objeto vazio. Este objeto será preenchido com perguntas à medida que forem adicionadas.
-   Definir `this.currentQuestion` como `'start'` para definir a pergunta inicial.
-   Inicializar `this.answers` como um objeto vazio que será preenchido com as respostas do usuário.
-   Inicializar `this.progressListeners` como uma lista vazia. Este array será preenchido com funções que serão chamadas quando o progresso for alterado (por exemplo, quando uma pergunta é respondida).

#### Exceções

Se ocorrer algum erro durante a inicialização, o método `error` da instância `Logger` será chamado para registrar o erro.

javascript

```js
catch (error) {
    this.logger.error("Erro ao inicializar o chat", error);
}
```

Isso garantirá que todos os erros sejam adequadamente registrados e tratados.

---

### `initDOMElements()`

#### Descrição

O método `initDOMElements` é responsável por inicializar os elementos do DOM relacionados ao chatbot. Esses elementos são armazenados como propriedades do objeto para facilitar a manipulação subsequente.

#### Parâmetros

Este método não aceita nenhum parâmetro.

#### Exemplo de uso

Este método é geralmente chamado automaticamente pelo construtor e, portanto, não é necessário chamá-lo explicitamente.

javascript

```js
const chatBot = new ChatBot(); // initDOMElements() é chamado internamente
```

#### Detalhes de Implementação

O método tenta encontrar e armazenar os seguintes elementos do DOM:

-   `this.chatWrapper`: O elemento que envolve todo o chatbot.
-   `this.chatIcon`: O ícone para abrir o chatbot.
-   `this.chatMain`: O elemento principal do chatbot.
-   `this.minimizeButton`: O botão para minimizar o chatbot.
-   `this.chatLog`: O log onde as mensagens são exibidas.
-   `this.inputArea`: A área onde os inputs do usuário são capturados.

#### Exceções

Se o método não conseguir encontrar o elemento com o ID `#mkt-chatbot-wrapper` ou qualquer um dos seus elementos filho necessários, ele chamará o método `error` do `Logger` para registrar o erro.

---

### `initDOMEvents()`

#### Descrição

O método `initDOMEvents` é responsável por inicializar os eventos do DOM que controlam a interação do usuário com o chatbot. Por exemplo, ele define os eventos de clique para o ícone do chat e o botão de minimizar.

#### Parâmetros

Este método não aceita nenhum parâmetro.

#### Exemplo de uso

Assim como `initDOMElements`, este método é geralmente chamado automaticamente pelo construtor.

javascript

```js
const chatBot = new ChatBot(); // initDOMEvents() é chamado internamente
```

#### Detalhes de Implementação

O método tenta adicionar os seguintes listeners de evento:

-   Um evento de clique para `this.chatIcon` que chama o método `openChat()`.
-   Um evento de clique para `this.minimizeButton` que chama o método `minimizeChat()`.

#### Exceções

Se ocorrer algum erro ao adicionar os listeners de evento, o método `error` da instância `Logger` será chamado para registrar o erro.

Isso garantirá que todos os erros sejam adequadamente registrados e tratados.

---

### `start()`

#### Descrição

O método `start` é responsável por iniciar a conversa no chatbot, mostrando a primeira pergunta e tornando visível a interface do chatbot.

#### Parâmetros

Este método não aceita nenhum parâmetro.

#### Exemplo de uso

javascript

```js
const chatBot = new ChatBot();

//Definição de perguntas aqui ...

chatBot.start(); // Inicia a conversa
```

#### Detalhes de Implementação

O método tenta mostrar a primeira pergunta (denominada `this.currentQuestion`) usando o método `showQuestion`. Ele também remove a classe `hidden` do wrapper do chat para torná-lo visível.

#### Exceções

Se ocorrer um erro ao iniciar a conversa (por exemplo, se não houver nenhuma pergunta inicial configurada), o método `error` da instância `Logger` será chamado para registrar o erro.

---

### `addQuestion(key, text, type, choices = [], nextQuestion = null)`

#### Descrição

Este método é usado para adicionar uma pergunta ao chatbot.

#### Parâmetros

-   `key`: A chave única que identifica a pergunta.
-   `text`: O texto da pergunta ou uma função que retorne o texto.
-   `type`: O tipo de pergunta (por exemplo, "text", "select", "button").
-   `choices`: Um array contendo as opções para perguntas de múltipla escolha (opcional).
-   `nextQuestion`: A chave da próxima pergunta ou uma função que determine a próxima pergunta (opcional).

#### Exemplo de uso

javascript

```js
const chatBot = new ChatBot();

chatBot.addQuestion(
    "start",
    "Você está se candidatando ou está preenchendo em nome de outra pessoa (filho, neto, sobrinho, etc.)?",
    "button",
    [
        { text: "Sou o candidato", value: "eu" },
        { text: "Estou preenchendo para outra pessoa", value: "outra" },
    ],
    (choice) => {
        if (choice.value === "eu") {
            return "candidato";
        } else {
            return "responsavel";
        }
    }
);

chatBot.addQuestion(
    "responsavel",
    "Você é o responsável pelo candidato? Se sim, informe seu nome completo. Se não, diga o nome do responsável",
    "text",
    {
        attrs: {
            placeholder: "Nome completo responsável",
            type: "text",
        },
    },
    (answer) => {
        return "candidato";
    }
);

chatBot.addQuestion(
    "candidato",
    (answers) => {
        if (chatBot.answers.start.value === "eu") {
            return `Qual seu nome completo?`;
        } else {
            return `Qual o nome completo do candidato?`;
        }
    },
    "text",
    {
        attrs: {
            placeholder: "Nome completo",
            type: "text",
        },
    },
    (answer) => {
        return "idade";
    }
);

chatBot.addQuestion(
    "idade",
    (answers) => {
        if (chatBot.answers.start.value === "eu") {
            return `Qual sua idade?`;
        } else {
            return `Qual a idade do candidato?`;
        }
    },
    "select",
    [
        { text: "6 anos", value: "6" },
        { text: "7 anos", value: "7" },
        { text: "8 anos", value: "8" },
        { text: "9 anos", value: "9" },
        { text: "10 anos", value: "10" },
        { text: "11 anos", value: "11" },
        { text: "12 anos", value: "12" },
        { text: "13 anos", value: "13" },
        { text: "14 anos", value: "14" },
        { text: "15 anos", value: "15" },
        { text: "16 anos", value: "16" },
        { text: "17 anos", value: "17" },
    ],
    (answer) => {
        return "whatsapp";
    }
);
```

#### Detalhes de Implementação

O método adiciona uma pergunta ao objeto `this.questions`.

#### Exceções

Se uma pergunta com a mesma chave já existir, o método `warn` da instância `Logger` será chamado para registrar um aviso.

---

### `addProgressListener(listener)`

#### Descrição

Adiciona um ouvinte de progresso ao chatbot.

#### Parâmetros

-   `listener`: Uma função que será chamada sempre que houver progresso na conversa.

#### Exemplo de uso

javascript

```js
const chatBot = new ChatBot();
chatBot.addProgressListener((progressData) => {
    console.log("Progresso: ", progressData);

    if (!progressData.nextQuestion) {
        console.log(chatBot.answers);
        console.log("Fim da conversa");
    }
});
```

#### Detalhes de Implementação

O método adiciona o ouvinte à lista `this.progressListeners`.

#### Exceções

Se o `listener` fornecido não for uma função, ele será ignorado.

---

### `notifyProgressListeners(progressData)`

#### Descrição

Notifica todos os ouvintes de progresso registrados, passando os dados de progresso como argumento.

#### Parâmetros

-   `progressData`: Os dados de progresso que serão passados para todos os ouvintes.

#### Exemplo de uso

Este método é geralmente chamado internamente pelo chatbot para notificar os ouvintes sobre mudanças no progresso da conversa.

javascript

```js
this.notifyProgressListeners({
    currentQuestion: "start",
    answer: "Informações",
});
```

#### Detalhes de Implementação

O método itera sobre todos os ouvintes de progresso registrados e os notifica passando `progressData` como argumento.

#### Exceções

Nenhuma.

Espero que essas informações sejam úteis para entender melhor como usar e estender a classe `ChatBot`.

### `showQuestion(key, prevAnswer)`

#### Descrição

Exibe uma pergunta com base em sua chave.

#### Parâmetros

-   `key` (string): A chave da pergunta.
-   `prevAnswer` (Object): A resposta anterior fornecida pelo usuário.

#### Exemplo de uso

javascript

```js
chatBot.showQuestion("question_1", null);
```

---

### `async showQuestion(key, lastAnswer = null)`

#### Descrição

Este método assíncrono é responsável por mostrar a pergunta atual no chatbot, baseada na chave fornecida.

#### Parâmetros

-   `key`: A chave que identifica a pergunta a ser mostrada.
-   `lastAnswer`: A última resposta fornecida (opcional).

#### Exemplo de uso

javascript

```js
await chatBot.showQuestion("start");
```

#### Detalhes de Implementação

O método tenta encontrar a pergunta correspondente à chave fornecida e a renderiza de acordo com seu tipo.

#### Exceções

Se a pergunta não for encontrada ou o tipo de input não for suportado, um erro é registrado.

---

### `getRenderMethod(type)`

#### Descrição

Este método retorna o método de renderização apropriado com base no tipo de input fornecido.

#### Parâmetros

-   `type`: O tipo de input (por exemplo, 'button', 'select', 'text', 'link').

#### Exemplo de uso

javascript

```js
const renderMethod = chatBot.getRenderMethod("button");
```

#### Detalhes de Implementação

O método consulta um objeto que mapeia tipos de inputs para métodos de renderização e retorna o método correspondente.

#### Exceções

Retorna `null` se o tipo de input não for suportado.

---

### `renderButton(choice)`

#### Descrição

Este método renderiza um botão como opção de resposta.

#### Parâmetros

-   `choice`: O objeto que representa a opção de resposta.

#### Exemplo de uso

Este método é geralmente chamado internamente pelo chatbot.

#### Detalhes de Implementação

O método cria um elemento de botão e o anexa à área de input.

#### Exceções

Se ocorrer um erro na renderização, um erro é registrado.

---

### `renderSelect(choices)`

#### Descrição

Este método renderiza um dropdown select como opção de resposta.

#### Parâmetros

-   `choices`: Um array contendo as opções a serem adicionadas ao select.

#### Exemplo de uso

Este método é geralmente chamado internamente pelo chatbot.

#### Detalhes de Implementação

O método cria um elemento `select` e adiciona as opções fornecidas.

#### Exceções

Se ocorrer um erro na renderização, um erro é registrado.

---

### `renderText(choices = {})`

#### Descrição

Este método renderiza um campo de texto como opção de resposta.

#### Parâmetros

-   `choices`: Um objeto contendo atributos opcionais para o campo de texto.

#### Exemplo de uso

Este método é geralmente chamado internamente pelo chatbot.

#### Detalhes de Implementação

O método cria um elemento de entrada de texto e o anexa à área de input.

#### Exceções

Se ocorrer um erro na renderização, um erro é registrado.

---

### `renderLink(choices)`

#### Descrição

Este método renderiza um link como opção de resposta.

#### Parâmetros

-   `choices`: Um objeto que representa a opção de resposta.

#### Exemplo de uso

Este método é geralmente chamado internamente pelo chatbot.

#### Detalhes de Implementação

O método cria um elemento de link e o anexa à área de input.

#### Exceções

Se ocorrer um erro na renderização, um erro é registrado.

---

### `maskInput(input, masks = ['(00) 0000-0000', '(00) 00000-0000'])`

#### Descrição

Este método adiciona uma máscara ao campo de entrada de texto (`input`), como números de telefone ou CPF.

#### Parâmetros

-   `input`: O elemento de entrada de texto (`input`) ao qual a máscara deve ser aplicada.
-   `masks`: Um array de máscaras possíveis (opcional).

#### Exemplo de uso

javascript

```js
this.maskInput(myInput, ["(00) 0000-0000", "(00) 00000-0000"]);
```

#### Detalhes de Implementação

O método adiciona um "ouvinte" de evento ao campo de entrada para aplicar dinamicamente a máscara enquanto o usuário digita.

#### Exceções

Nenhuma.

---

### `async appendBotMessage(message)`

#### Descrição

Este método assíncrono anexa uma mensagem enviada pelo bot à área de log do chat.

#### Parâmetros

-   `message`: A mensagem a ser exibida.

#### Exemplo de uso

javascript

```js
await this.appendBotMessage("Olá, como posso ajudar?");
```

#### Detalhes de Implementação

O método cria um novo elemento DOM para a mensagem do bot e o anexa ao log de chat.

#### Exceções

Se ocorrer um erro na anexação, um erro é registrado.

---

### `clearInputArea()`

#### Descrição

Este método limpa a área de entrada de texto, removendo todos os elementos filhos.

#### Parâmetros

Nenhum.

#### Exemplo de uso

javascript

`this.clearInputArea();`

#### Detalhes de Implementação

O método remove todos os elementos filhos da área de entrada de texto.

#### Exceções

Se ocorrer um erro na limpeza, um erro é registrado.

---

### `async appendBotTyping()`

#### Descrição

Este método assíncrono anexa um elemento de "digitando" para simular que o bot está digitando uma mensagem.

#### Parâmetros

Nenhum.

#### Exemplo de uso

javascript

```js
await this.appendBotTyping();
```

#### Detalhes de Implementação

O método cria um novo elemento DOM que simula a ação de "digitando" e o anexa ao log de chat. Após um segundo, o elemento é removido.

#### Exceções

Se ocorrer um erro na anexação, um erro é registrado.

---

### `async processAnswer(answer, appendOnChat = true)`

#### Descrição

Este método assíncrono processa a resposta fornecida pelo usuário e passa para a próxima pergunta, caso haja uma.

#### Parâmetros

-   `answer`: A resposta fornecida pelo usuário.
-   `appendOnChat`: Boolean que determina se a mensagem deve ser adicionada ao chat. O padrão é `true`.

#### Exemplo de uso

javascript

```js
await this.processAnswer({ text: "Sim", value: "sim" }, true);
```

#### Detalhes de Implementação

O método chama outras funções internas como `storeAnswer`, `appendUserMessage`, e `getNextQuestionKey` para processar completamente a resposta.

#### Exceções

Loga erro se houver um problema no processamento.

---

### `storeAnswer(key, answer)`

#### Descrição

Armazena a resposta do usuário em um objeto `this.answers` indexado pela chave da pergunta.

#### Parâmetros

-   `key`: A chave da pergunta atual.
-   `answer`: A resposta fornecida pelo usuário.

#### Exemplo de uso

javascript

```js
this.storeAnswer("question1", { text: "Sim", value: "sim" });
```

#### Exceções

Nenhuma.

---

### `async getNextQuestionKey(answer)`

#### Descrição

Este método assíncrono retorna a chave da próxima pergunta com base na resposta fornecida.

#### Parâmetros

-   `answer`: A resposta fornecida pelo usuário.

#### Exemplo de uso

javascript

```js
const nextKey = await this.getNextQuestionKey({ text: "Sim", value: "sim" });
```

#### Exceções

Nenhuma.

---

### `async appendUserMessage(message)`

#### Descrição

Este método assíncrono anexa uma mensagem enviada pelo usuário à área de log do chat.

#### Parâmetros

-   `message`: A mensagem a ser exibida.

#### Exemplo de uso

javascript

```js
await this.appendUserMessage("Olá!");
```

#### Exceções

Loga erro se houver um problema na anexação.

---

### `scrollToBottom()`

#### Descrição

Este método rola o chat para a parte inferior, de modo que as mensagens mais recentes possam ser vistas.

#### Parâmetros

Nenhum.

#### Exemplo de uso

javascript

```js
this.scrollToBottom();
```

#### Exceções

Loga erro se o elemento de chat não for encontrado.

---

### `createElement(tag, className, textContent, attributes = {})`

#### Descrição

Cria um novo elemento DOM com as propriedades fornecidas.

#### Parâmetros

-   `tag`: O tipo do elemento.
-   `className`: A classe CSS do elemento.
-   `textContent`: O conteúdo de texto do elemento.
-   `attributes`: Outros atributos do elemento.

#### Exemplo de uso

javascript

```js
const newElement = this.createElement("div", "my-class", "Hello");
```

#### Exceções

Nenhuma.

---

### `sleep(ms)`

#### Descrição

Pausa a execução por um número determinado de milissegundos.

#### Parâmetros

-   `ms`: O número de milissegundos para pausar.

#### Exemplo de uso

javascript

```js
await this.sleep(1000);
```

#### Exceções

Nenhuma.

---

### `openChat()`

#### Descrição

Abre o chat e oculta o ícone de chat.

#### Parâmetros

Nenhum.

#### Exemplo de uso

javascript

```js
this.openChat();
```

#### Exceções

Loga erro se os elementos necessários não forem encontrados no DOM.

---

### `minimizeChat()`

#### Descrição

Minimiza o chat e mostra o ícone de chat.

#### Parâmetros

Nenhum.

#### Exemplo de uso

javascript

```js
this.minimizeChat();
```

#### Exceções

Loga erro se os elementos necessários não forem encontrados no DOM.

---

# Documentação de Estrutura HTML para o ChatBot

O HTML abaixo define a estrutura básica do ChatBot, incluindo elementos para o ícone de chat, área principal de chat, cabeçalho, log de mensagens e inputs.

## Estrutura Principal

### `#mkt-chatbot-wrapper`

#### Descrição

Este é o contêiner principal que envolve todo o chatbot.

#### Classe CSS

-   `chat-wrapper`
-   `hidden`: Esconde o chatbot por padrão.

---

### `#mkt-chatbot-icon`

#### Descrição

É o ícone visível antes do chat ser aberto. Ele serve como um gatilho para abrir o chat.

#### Classe CSS

-   `chat-icon`
-   `chat-icon-position-right`: Posiciona o ícone à direita.

#### Subelementos

-   `#mkt-chatbot-message`: Mostra uma mensagem para induzir o usuário a clicar e iniciar o chat.
-   `#chatbot-icon-img`: Espaço para um avatar ou ícone.

---

### `#mkt-chatbot`

#### Descrição

Este é o contêiner para o chat aberto.

#### Classe CSS

-   `chat-main`
-   `hidden`: Esconde o chatbot por padrão.

#### Subelementos

1.  **Cabeçalho do Chat (`#mkt-chatbot-header`)**

    -   `chat-header-left`: Contém o avatar do chatbot.
        -   `#chatbot-header-img`: Espaço para o avatar do chatbot.
    -   `chat-header-info`: Contém informações adicionais como nome e status.
        -   `#mkt-chatbot-name`: Nome do atendente ou chatbot.
        -   `#mkt-chatbot-status`: Status atual, por exemplo, "Online".
    -   `#mkt-chatbot-minimize`: Botão para minimizar o chat.

2.  **Log de Mensagens (`#mkt-chatbot-log`)**

    -   Este é o espaço onde as mensagens serão dinamicamente adicionadas.

3.  **Inputs (`#mkt-chatbot-inputs`)**

    -   `chat-inputs__dynamic`: Contêiner para inputs dinâmicos.
        -   Inputs de texto, botões ou outros elementos podem ser adicionados aqui.
    -   `chat-inputs__send-button`: Botão de enviar sempre presente.

---

### Classe CSS adicionais

-   `chat-message`: Define o estilo para a mensagem dentro do `#mkt-chatbot-message`.
-   `chat-avatar`: Define o estilo para o avatar dentro do `#chatbot-icon-img`.
-   `chat-header-avatar`: Define o estilo para o avatar dentro do `#chatbot-header-img`.
-   `chat-header-name`: Define o estilo para o nome do atendente ou chatbot.
-   `chat-header-status`: Define o estilo para o status do atendente ou chatbot.
-   `chat-log`: Define o estilo para o log de mensagens.
-   `chat-inputs`: Define o estilo para o contêiner de inputs.
-   `input--text`: Define o estilo para os inputs de texto.
-   `input--link`: Define o estilo para os links.
-   `input--buttons`: Define o estilo para os botões.

---

# Visão Geral do uso

Esta documentação fornece uma visão geral do código que implementa um chatbot. O chatbot faz perguntas ao usuário, coleta respostas e envia os dados coletados para um servidor remoto.

## Estrutura Básica do Código

-   `URLI`: URL base para a API.
-   `chatBot`: Instância da classe `ChatBot`.
-   `network`: Instância da classe `Network`.
-   `CookieAndURLManager`: Gerencia o preenchimento de respostas do chatbot a partir de parâmetros URL e cookies.
-   `Network.fetchAdditionalInfo()`: Preenche `chatBot.answers` com informações adicionais.
-   `sendToServer(chatbot)`: Envia os dados coletados para o servidor.
-   `chatBot.addQuestion()`: Adiciona perguntas ao chatbot.
-   `chatBot.addProgressListener()`: Adiciona um listener para acompanhar o progresso da conversa.

## Fluxo de Funcionamento

1.  O chatbot é inicializado e as respostas são preenchidas a partir de parâmetros URL e cookies, bem como de informações adicionais.
2.  As perguntas são adicionadas ao chatbot usando `chatBot.addQuestion()`.
3.  Um listener de progresso é adicionado ao chatbot.
4.  O chatbot é iniciado.

## Detalhamento das Funções

### `sendToServer(chatbot)`

Esta função é responsável por enviar os dados coletados pelo chatbot para o servidor.

-   **Parâmetros**: `chatbot` - a instância do chatbot.
-   **Funcionamento**:
    1.  Processa todas as respostas do chatbot e as adiciona a um objeto `data`.
    2.  Cria um `FormData` e anexa todas as entradas de `data`.
    3.  Faz uma requisição `POST` para `${URLI}lead/add`.
    4.  Analisa a resposta e envia eventos para o Google Tag Manager e o Facebook Ads, conforme apropriado.

### `chatBot.addQuestion(id, question, type, options, callback)`

Esta função adiciona uma nova pergunta ao chatbot.

-   **Parâmetros**:
    -   `id`: Identificador único para a pergunta.
    -   `question`: Texto da pergunta ou função que retorna o texto.
    -   `type`: Tipo da pergunta (ex: "button", "text", "select").
    -   `options`: Opções para a pergunta.
    -   `callback`: Função a ser chamada após a resposta à pergunta.

### `chatBot.addProgressListener(callback)`

Esta função adiciona um listener para acompanhar o progresso da conversa.

-   **Parâmetros**:
    -   `callback`: Função a ser chamada sempre que houver um avanço na conversa.

## Exemplo de Uso

Este exemplo ilustra o uso típico do chatbot:

1.  Instanciar as classes necessárias.
2.  Preencher as respostas iniciais do chatbot.
3.  Adicionar perguntas.
4.  Adicionar um listener de progresso.
5.  Iniciar o chatbot.

javascript

```js
const URLI = "https://mktcode.digital/api/v1";
const chatBot = new ChatBot();
const network = new Network();

async function sendToServer(chatbot) {
    try {
        // Processar todas as respostas do chatBot
        const data = {};
        for (const [key, value] of Object.entries(chatbot.answers)) {
            data[key] = value.value;
        }

        // Criar novo FormData
        const formData = new FormData();

        // Adicionar todos os dados do objeto data ao formData
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // Fazer a requisição e esperar a resposta
        const res = await network.Insert(`${URLI}lead/add`, formData);
        chatbot.response = res;

        if ("duplicado" in chatBot.response) {
            // Envia evento ao Google Tag Manager
            EventTracker.sendEvent("GTM", "", "Lead Duplicado");

            // Envia eventos customizados ao Facebook Ads
            EventTracker.sendEvent(
                "FB",
                "custom",
                `Lead Duplicado`,
                {},
                { eventID: chatBot.answers.id_event.value }
            );
        } else {
            // Envia evento ao Google Tag Manager
            EventTracker.sendEvent("GTM", "", "Lead");

            // Envia eventos padrão ao Facebook Ads
            EventTracker.sendEvent(
                "FB",
                "standard",
                "Lead",
                {},
                { eventID: chatBot.answers.id_event.value }
            );
        }
    } catch (error) {
        console.error("Ocorreu um erro ao enviar para o servidor: ", error);
    }
}

// Etapas 1 e 2
// Preencher chatBot.answers com os parâmetros da URL
CookieAndURLManager.fillAnswersFromURLParameters(chatBot.answers);
// Preencher chatBot.answers com os Cookies
CookieAndURLManager.fillAnswersFromCookies(chatBot.answers);
// Preencher chatBot.answers com informações adicionais
Network.fetchAdditionalInfo(chatBot.answers);

// Etapa 3
chatBot.addQuestion(
    "start",
    "Você está se candidatando ou está preenchendo em nome de outra pessoa (filho, neto, sobrinho, etc.)?",
    "button",
    [
        { text: "Sou o candidato", value: "eu" },
        { text: "Estou preenchendo para outra pessoa", value: "outra" },
    ],
    (choice) => {
        if (choice.value === "eu") {
            return "candidato";
        } else {
            return "responsavel";
        }
    }
);

chatBot.addQuestion(
    "responsavel",
    "Você é o responsável pelo candidato? Se sim, informe seu nome completo. Se não, diga o nome do responsável",
    "text",
    {
        attrs: {
            placeholder: "Nome completo responsável",
            type: "text",
        },
    },
    (answer) => {
        return "candidato";
    }
);

chatBot.addQuestion(
    "candidato",
    (answers) => {
        if (chatBot.answers.start.value === "eu") {
            return `Qual seu nome completo?`;
        } else {
            return `Qual o nome completo do candidato?`;
        }
    },
    "text",
    {
        attrs: {
            placeholder: "Nome completo",
            type: "text",
        },
    },
    (answer) => {
        return "idade";
    }
);

chatBot.addQuestion(
    "idade",
    (answers) => {
        if (chatBot.answers.start.value === "eu") {
            return `Qual sua idade?`;
        } else {
            return `Qual a idade do candidato?`;
        }
    },
    "select",
    [
        { text: "6 anos", value: "6" },
        { text: "7 anos", value: "7" },
        { text: "8 anos", value: "8" },
        { text: "9 anos", value: "9" },
        { text: "10 anos", value: "10" },
        { text: "11 anos", value: "11" },
        { text: "12 anos", value: "12" },
        { text: "13 anos", value: "13" },
        { text: "14 anos", value: "14" },
        { text: "15 anos", value: "15" },
        { text: "16 anos", value: "16" },
        { text: "17 anos", value: "17" },
    ],
    (answer) => {
        return "whatsapp";
    }
);

chatBot.addQuestion(
    "whatsapp",
    (answers) => {
        if (chatBot.answers.start.value === "eu") {
            return `Qual seu número de WhatsApp?`;
        } else {
            return `Qual o número de WhatsApp do candidato?`;
        }
    },
    "text",
    {
        attrs: {
            placeholder: "Número de WhatsApp",
            type: "tel",
        },
    },
    (answer) => {
        return "end";
    }
);

chatBot.addQuestion(
    "end",
    (answers) => {
        if (chatBot.answers.start.value === "eu") {
            return `Obrigado por se candidatar! Entraremos em contato em breve.`;
        } else {
            return `Obrigado por preencher o formulário! Entraremos em contato em breve.`;
        }
    },
    "link",
    [
        {
            text: "Link de destino",
            value: "https://mktcode.digital/",
            target: "_blank",
        },
    ],
    (answer) => {
        return;
    }
);

// Etapa 4
chatBot.addProgressListener((progressData) => {
    if (progressData.nextQuestion == "end") {
        sendToServer(chatBot)
            .then(() => {
                // Esta parte será executada apenas depois que sendToServer for concluído
                console.log(chatBot.response);

                // Alterar a questão end
                chatBot.questions.end.choices = [
                    {
                        text: "Novo Link",
                        attrs: {
                            href: "https://mktcode.digital/novo",
                            target: "_blank",
                        },
                    },
                ];
            })
            .catch((error) => {
                console.error("Erro ao enviar para o servidor:", error);
            });
    }
    if (!progressData.nextQuestion) {
        console.log(chatBot.answers);
        console.log("Fim da conversa");
    }
});

// Definir um id unico
chatBot.answers.id_event = {
    text: "ID Evento",
    value: Utils.generateUniqueId(),
};

// Etapa 5
chatBot.start();
```

Para um entendimento completo, você pode referir-se ao código-fonte integral fornecido anteriormente.