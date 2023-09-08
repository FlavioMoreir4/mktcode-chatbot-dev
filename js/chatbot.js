// Classe ChatBot para gerenciar a lógica do chat
class ChatBot {
    constructor() {
        try {
            this.logger = new Logger();
            // Inicializa elementos DOM e eventos
            this.initDOMElements();
            this.initDOMEvents();

            // Inicializa o chat
            this.questions = {};  // Objeto de perguntas
            this.currentQuestion = 'start';
            this.answers = {};
            this.progressListeners = [];
        } catch (error) {
            this.logger.error("Erro ao inicializar o chat", error);
        }
    }

    /**
   * Inicializa elementos do DOM.
   */
    initDOMElements() {
        try {
            this.chatWrapper = document.getElementById("mkt-chatbot-wrapper");
            this.chatIcon = this.chatWrapper.querySelector("#mkt-chatbot-icon");
            this.chatMain = this.chatWrapper.querySelector("#mkt-chatbot");
            this.minimizeButton = this.chatWrapper.querySelector("#mkt-chatbot-minimize");
            this.chatLog = this.chatWrapper.querySelector("#mkt-chatbot-log");
            this.inputArea = this.chatWrapper.querySelector("#mkt-chatbot-inputs");
        } catch (error) {
            this.logger.error("Verifique se o elemento #mkt-chatbot-wrapper existe no DOM.", error)
        }
    }

    /**
     * Inicializa eventos do DOM.
     */
    initDOMEvents() {
        try {
            this.chatIcon.addEventListener("click", () => this.openChat());
            this.minimizeButton.addEventListener("click", () => this.minimizeChat());
        } catch (error) {
            this.logger.error("Erro ao inicializar eventos do DOM", error);
        }
    }

    /**
     * Inicia a conversa mostrando a primeira pergunta.
     */
    start() {
        try {
            this.showQuestion(this.currentQuestion);
            this.chatWrapper.classList.remove("hidden");
        } catch (error) {
            this.logger.error("Erro ao iniciar a conversa. Verifique se você adicionou pelo menos uma pergunta.", error);
        }
    }

    // Método para adicionar uma pergunta
    addQuestion(key, text, type, choices = [], nextQuestion = null) {
        if (this.questions[key]) {
            this.logger.warn(`A pergunta com a chave ${key} já existe. A pergunta não será adicionada novamente.`);
            return;
        }

        this.questions[key] = {
            text, // isto pode ser uma string ou uma função
            type,
            choices,
            nextQuestion // isto pode ser uma string ou uma função
        };
    }

    // Método para adicionar um ouvinte de progresso
    addProgressListener(listener) {
        if (typeof listener === 'function') {
            this.progressListeners.push(listener);
        }
    }

    // Método para notificar todos os ouvintes de progresso
    notifyProgressListeners(progressData) {
        this.progressListeners.forEach(listener => listener(progressData));
    }

    /**
     * Mostra a pergunta atual.
     * @param {string} key - A chave identificando a pergunta a ser mostrada.
     */
    async showQuestion(key, lastAnswer = null) {
        try {
            const question = this.questions[key];
            if (!question) throw new Error(`A pergunta com a chave ${key} não foi encontrada.`);

            this.clearInputArea();

            if (typeof question.text == 'function') {
                await this.appendBotMessage(question.text(this.answers));
            } else {
                await this.appendBotMessage(question.text);
            }


            const renderMethod = this.getRenderMethod(question.type);
            if (!renderMethod) throw new Error(`O tipo de input ${question.type} não é suportado.`);

            if (question.type === "select") {
                renderMethod.call(this, question.choices);
            } else if (question.type === 'text') {
                renderMethod.call(this, question.choices);
            } else {
                question.choices.forEach(choice => renderMethod.call(this, choice));
            }
            this.scrollToBottom();
        } catch (error) {
            this.logger.error(`Erro ao mostrar a pergunta com a chave ${key}. Verifique se a pergunta existe e se o tipo de input é suportado.`, error);
        }
    }

    /**
     * Obtém o método de renderização apropriado com base no tipo de input.
     * @param {string} type - O tipo de input.
     * @return {function} - O método de renderização apropriado.
     */
    getRenderMethod(type) {
        const renderMethods = {
            'button': this.renderButton,
            'select': this.renderSelect,
            'text': this.renderText,
            'link': this.renderLink
        };
        return renderMethods[type] || null;
    }

    /**
   * Renderiza um botão como opção de resposta.
   * @param {Object} choice - O objeto representando a opção de resposta.
   */
    renderButton(choice) {
        try {
            const chatInputsDynamic = this.createElement("div", "chat-inputs__dynamic");
            const button = this.createElement("button", "input--buttons", choice.text);
            button.addEventListener("click", () => this.processAnswer(choice));
            chatInputsDynamic.appendChild(button);
            this.inputArea.appendChild(chatInputsDynamic);
        } catch (error) {
            this.logger.error(`Erro ao renderizar botão com o texto ${choice.text}. Verifique se o texto é uma string e se você adicionou pelo menos uma pergunta.`, error);
        }
    }

    /**
     * Renderiza um dropdown select como opção de resposta.
     * @param {Array} choices - O array de opções a serem adicionadas ao select.
     */
    renderSelect(choices) {
        try {
            const chatInputsDynamic = this.createElement("div", "chat-inputs__dynamic");
            const select = this.createElement("select", "input--select");
            select.appendChild(
                this.createElement("option", null, "Selecione uma opção", { value: "" })
            )
            choices.forEach(option => {
                let attrs = {};
                if (option.attrs) {
                    attrs = option.attrs;
                }
                attrs.value = option.value
                const optionElement = this.createElement("option", null, option.text, attrs);
                select.appendChild(optionElement);
            });
            select.addEventListener("change", event => this.processAnswer({
                text: event.target.selectedOptions[0].text,
                value: event.target.value
            }));
            chatInputsDynamic.appendChild(select);
            this.inputArea.appendChild(chatInputsDynamic);
        } catch (error) {
            this.logger.error(`Erro ao renderizar select com as opções ${choices}. Verifique se o array de opções é válido e se você adicionou pelo menos uma pergunta.`, error);
        }
    }

    // Método para adicionar máscara a inputs
    maskInput(input, masks = ['(00) 0000-0000', '(00) 00000-0000']) {
        // Pega o tamanho máximo da máscara
        const maxMaskSize = Math.max(...masks.map(mask => mask.replace(/\D/g, '').length));

        // Adiciona um 'ouvinte' para o evento de digitar
        input.addEventListener("input", function (e) {
            // Remove tudo que não é número
            let value = this.value.replace(/\D/g, '');

            // Limita o tamanho do input
            value = value.substring(0, maxMaskSize);

            // Escolhe a máscara com base no comprimento do valor
            let mask = masks.find(mask => mask.replace(/\D/g, '').length >= value.length) || masks[masks.length - 1];

            // Aplica a máscara
            let result = '';
            let index = 0;
            for (let char of mask) {
                if (index >= value.length) break;
                if (/\D/.test(char)) {
                    result += char;
                } else {
                    result += value[index++];
                }
            }

            // Atualiza o valor do input com o formato
            this.value = result;
        });
    }

    /**
     * Renderiza um campo de texto como opção de resposta.
     */
    renderText(choices = {}) {
        try {
            let attrs = {};
            if (choices.attrs) {
                attrs = choices.attrs;
            }
            const chatInputsDynamic = this.createElement("div", "chat-inputs__dynamic");
            const input = this.createElement("input", "input--text", null, attrs);

            //Se o input for type tel criar mascara
            if (attrs.type == "tel") {
                this.maskInput(input, ['(00) 0000-0000', '(00) 00000-0000']);
            }

            //cpf ou cnpj
            if (attrs.data_cpf) {
                this.maskInput(input, ['000.000.000-00', '00.000.000/0000-00']);
            }

            //cep
            if (attrs.data_cep) {
                this.maskInput(input, ['00000-000']);
            }

            //data
            if (attrs.data_data) {
                this.maskInput(input, ['00/00/0000']);
            }

            input.addEventListener("change", event => this.processAnswer({
                text: event.target.value,
                value: event.target.value
            }));
            const sendButton = this.createElement("button", "chat-inputs__send-button", "");
            sendButton.addEventListener("click", () => this.processAnswer({
                text: input.value,
                value: input.value
            }));
            chatInputsDynamic.appendChild(input);
            chatInputsDynamic.appendChild(sendButton);
            this.inputArea.appendChild(chatInputsDynamic);
        } catch (error) {
            this.logger.error(`Erro ao renderizar input de texto com as opções ${choices}. Verifique se o array de opções é válido e se você adicionou pelo menos uma pergunta.`, error);
        }
    }

    /**
     * Renderiza um link como opção de resposta.
     * @param {Object} choices - O objeto representando a opção de resposta.
     */
    renderLink(choices) {
        try {
            const chatInputsDynamic = this.createElement("div", "chat-inputs__dynamic");
            // Montar objeto de attributes
            /*
            choices.attrs = {
                href: "https://www.google.com.br",
                target: "_blank"

            };
            */

            let attrs = {};
            if (choices.attrs) {
                attrs = choices.attrs;
            }
            const link = this.createElement("a", "input--link", choices.text, choices.attrs);
            link.addEventListener("click", () => this.processAnswer(choices, false));
            chatInputsDynamic.appendChild(link);
            this.inputArea.appendChild(chatInputsDynamic);
        } catch (error) {
            this.logger.error(`Erro ao renderizar link com o texto ${choices.text}. Verifique se o texto é uma string e se você adicionou pelo menos uma pergunta.`, error);
        }
    }

    /**
   * Anexa uma mensagem enviada pelo bot ao log do chat.
   * @param {string} message - A mensagem a ser exibida.
   */
    async appendBotMessage(message) {
        try {
            await this.appendBotTyping();
            const messageElement = this.createElement("div", "bot-message", message);
            this.chatLog.appendChild(messageElement);
            this.scrollToBottom();
        } catch (error) {
            this.logger.error(`Erro ao anexar a mensagem do bot com o texto ${message}. Verifique se o texto é uma string e se você adicionou pelo menos uma pergunta.`, error);
        }
    }

    /**
     * Limpa a área de input removendo todos os elementos filhos.
     */
    clearInputArea() {
        try {
            while (this.inputArea.firstChild) {
                this.inputArea.removeChild(this.inputArea.firstChild);
            }
        } catch (error) {
            this.logger.error("Erro ao limpar a área de input. Verifique se você adicionou pelo menos uma pergunta.", error);
        }
    }

    /**
     * Anexa um elemento de "digitando" para simular que o bot está digitando uma mensagem.
     */
    async appendBotTyping() {
        try {
            const messageElement = this.createElement("div", "bot-message-typing");
            ["dot1", "dot2", "dot3"].forEach(id => {
                const dot = this.createElement("span", "dot", null, { id });
                messageElement.appendChild(dot);
            });
            this.chatLog.appendChild(messageElement);
            this.scrollToBottom();
            await this.sleep(1000);
            this.chatLog.removeChild(messageElement);
        } catch (error) {
            this.logger.error("Erro ao anexar o elemento de 'digitando'", error)
        }
    }

    /**
     * Processa a resposta fornecida pelo usuário e passa para a próxima pergunta.
     * @param {Object} answer - A resposta fornecida pelo usuário.
     */
    async processAnswer(answer, appendOnChat = true) {
        try {
            this.storeAnswer(this.currentQuestion, answer);

            if (appendOnChat) {
                await this.appendUserMessage(answer.text);
            }
            const nextQuestion = await this.getNextQuestionKey(answer);

            const progressData = {
                currentQuestion: this.currentQuestion,
                answer: answer,
                nextQuestion: nextQuestion,
                answers: this.answers
            };

            // Notifica ouvintes de progresso
            this.notifyProgressListeners(progressData);

            if (nextQuestion) {
                this.currentQuestion = nextQuestion;
                this.showQuestion(this.currentQuestion, answer);
            } else {
                // Lógica para encerrar a conversa
                // Você também pode chamar `this.notifyProgressListeners` aqui com dados indicando que a conversa terminou
            }
        } catch (error) {
            this.logger.error("Erro ao processar a resposta", error);
        }
    }

    /**
     * Armazena a resposta do usuário em um objeto de respostas.
     * @param {string} key - A chave da pergunta atual.
     * @param {Object} answer - A resposta fornecida pelo usuário.
     */
    storeAnswer(key, answer) {
        this.answers[key] = answer;
    }

    /**
     * Obtém a chave para a próxima pergunta com base na resposta do usuário.
     * @param {Object} answer - A resposta fornecida pelo usuário.
     * @return {string|null} - A chave para a próxima pergunta ou null.
     */
    async getNextQuestionKey(answer) {
        const currentQuestion = this.questions[this.currentQuestion];
        if (currentQuestion.nextQuestion) {
            return currentQuestion.nextQuestion(answer);
        }
        return null;
    }

    /**
     * Anexa uma mensagem enviada pelo usuário ao log do chat.
     * @param {string} message - A mensagem a ser exibida.
     */
    async appendUserMessage(message) {
        try {
            const messageElement = this.createElement("div", "user-message", message);
            this.chatLog.appendChild(messageElement);
            this.scrollToBottom();
        } catch (error) {
            this.logger.error("Erro ao anexar a mensagem do usuário", error);
        }
    }

    /**
     * Rola o Chat Lot para o final
     */
    scrollToBottom() {
        if (this.chatLog) {
            this.chatLog.scrollTop = this.chatLog.scrollHeight;
        } else {
            this.logger.error("Erro ao rolar o chat para o final. Verifique se você adicionou o elemento #mkt-chatbot-log no DOM.")
        }
    }

    /**
     * Cria um novo elemento DOM.
     * @param {string} tag - O tipo do elemento.
     * @param {string} className - A classe CSS do elemento.
     * @param {string} textContent - O conteúdo de texto do elemento.
     * @param {Object} attributes - Outros atributos do elemento.
     * @return {HTMLElement} - O elemento DOM criado.
     */
    createElement(tag, className, textContent, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
        return element;
    }

    /**
     * Pausa a execução por um determinado número de milissegundos.
     * @param {number} ms - O número de milissegundos para pausar.
     * @return {Promise} - Uma promessa que se resolve após o tempo especificado.
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Abre o chat e oculta o ícone do chat.
     */
    openChat() {
        try {
            this.logger.debug("Para fechar clique no botão de minimizar.");
            this.chatIcon.classList.add("hidden");
            this.chatMain.classList.remove("hidden");
        } catch (error) {
            this.logger.error("Erro ao abrir o chat. Verifique se você adicionou os elementos #mkt-chatbot-icon e #mkt-chatbot no DOM.", error)
        }
    }

    /**
     * Minimiza o chat e mostra o ícone do chat.
     */
    minimizeChat() {
        try {
            this.chatMain.style.animation = "slide-fade-out 0.5s ease forwards";
            this.chatMain.addEventListener('animationend', () => {
                this.chatMain.classList.add("hidden");
                this.chatMain.style.animation = '';  // Limpa a animação
            }, { once: true });  // O evento só será disparado uma vez
            this.chatIcon.classList.remove("hidden");
        } catch (error) {
            this.logger.error("Erro ao minimizar o chat. Verifique se você adicionou os elementos #mkt-chatbot-icon e #mkt-chatbot no DOM.", error);
        }
    }

}