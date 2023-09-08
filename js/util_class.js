/**
 * Classe para utilidades diversas.
 */
class Utils {
    /**
     * Retorna o valor de um parâmetro específico na URL.
     * @param {string} paramName Nome do parâmetro.
     * @returns {string|boolean} Valor do parâmetro ou false se não encontrado.
     */
    static getURLParameter(paramName) {
        return new URLSearchParams(window.location.search).get(paramName) || false;
    }

    /**
     * Retorna todos os parâmetros da URL como um objeto.
     * @returns {object} Objeto com os parâmetros.
     */
    static getAllURLParameters() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    /**
     * Converte uma string de parâmetros em um objeto associativo.
     * @param {string} paramString String de parâmetros.
     * @returns {object} Objeto associativo.
     */
    static convertParamsToObject(paramString) {
        return paramString.split('&').reduce((acc, pair) => {
            const [key, value] = pair.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
    }

    /**
     * Converte uma string de cookies em um objeto associativo.
     * @param {string} cookieString String de cookies.
     * @returns {object} Objeto associativo.
     */
    static convertCookiesToObject(cookieString) {
        return cookieString.split(';').reduce((acc, pair) => {
            const [key, value] = pair.split('=');
            acc[key.trim()] = decodeURI(value);
            return acc;
        }, {});
    }

    /**
     * Retorna os cookies da página como um objeto.
     * @returns {object} Objeto com os cookies.
     */
    static getAllCookies() {
        const cookieString = document.cookie;
        return cookieString ? this.convertCookiesToObject(cookieString) : {};
    }

    /**
     * Converte a primeira letra de cada palavra para maiúscula.
     * @param {string} str String para converter.
     * @returns {string} String convertida.
     */
    static capitalizeWords(str) {
        return str.toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Gera um ID único.
     * @param {number} length Comprimento do ID.
     * @returns {number} ID único.
     */
    static generateUniqueId(length = 16) {
        return parseInt(
            Math.ceil(Math.random() * Date.now())
                .toPrecision(length)
                .toString()
                .replace('.', '')
        );
    }

    /**
     * Adiciona máscara a um elemento de entrada de texto.
     * @param {HTMLInputElement} input Elemento de entrada de texto.
     * @param {string[]} masks Lista de máscaras.
     */
    static maskInput(input, masks = ['(00) 0000-0000', '(00) 00000-0000']) {
        // Obtém o tamanho máximo da máscara
        const maxMaskSize = Math.max(...masks.map(mask => mask.replace(/\D/g, '').length));

        // Adiciona um evento 'input' para lidar com a formatação
        input.addEventListener('input', function (event) {
            // Remove caracteres não numéricos
            let numericValue = this.value.replace(/\D/g, '');

            // Trunca o valor para o tamanho máximo permitido pela máscara
            numericValue = numericValue.substring(0, maxMaskSize);

            // Escolhe a máscara apropriada com base no tamanho do valor
            const chosenMask = masks.find(mask => mask.replace(/\D/g, '').length >= numericValue.length) || masks[masks.length - 1];

            // Aplica a máscara ao valor
            let maskedValue = '';
            let index = 0;
            for (const char of chosenMask) {
                if (index >= numericValue.length) break;
                maskedValue += /\D/.test(char) ? char : numericValue[index++];
            }

            // Atualiza o valor do elemento de entrada
            this.value = maskedValue;
        });
    }

    /**
     * Embaralha um array de forma aleatória.
     * @param {Array} arr - O array a ser embaralhado.
     * @returns {Array} O array embaralhado.
     */
    static shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * Remove elementos duplicados de um array.
     * @param {Array} arr - O array original.
     * @returns {Array} Um novo array sem duplicatas.
     */
    static unique(arr) {
        return [...new Set(arr)];
    }

    /**
     * Encurta uma string para um determinado comprimento.
     * @param {string} str - A string original.
     * @param {number} length - O comprimento máximo da string.
     * @returns {string} A string encurtada.
     */
    static truncateString(str, length) {
        return str.length > length ? str.substring(0, length - 3) + '...' : str;
    }

    /**
     * Escapa caracteres especiais para uso em HTML.
     * @param {string} str - A string a ser escapada.
     * @returns {string} A string escapada.
     */
    static escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /**
     * Clona um objeto profundamente.
     * @param {Object} obj - O objeto a ser clonado.
     * @returns {Object} Uma cópia profunda do objeto.
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(value => this.deepClone(value));
        }
        const cloneObj = {};
        for (const [key, value] of Object.entries(obj)) {
            cloneObj[key] = this.deepClone(value);
        }
        return cloneObj;
    }

    /**
     * Mescla dois ou mais objetos.
     * @param {...Object} objs - Os objetos a serem mesclados.
     * @returns {Object} Um novo objeto contendo todas as propriedades dos objetos originais.
     */
    static mergeObjects(...objs) {
        const result = {};
        for (const obj of objs) {
            for (const [key, value] of Object.entries(obj)) {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    result[key] = this.mergeObjects(result[key], value);
                } else {
                    result[key] = value;
                }
            }
        }
        return result;
    }

    /**
     * Verifica se um objeto está vazio.
     * @param {Object} obj - O objeto a ser verificado.
     * @returns {boolean} Verdadeiro se o objeto estiver vazio, falso caso contrário.
     */
    static isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }

    /**
     * Retorna um elemento DOM com base em um seletor, mas inclui verificação de erro.
     * @param {string} selector - O seletor do elemento DOM.
     * @returns {Element|null} O elemento DOM ou null se não encontrado.
     */
    static getElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found for selector: ${selector}`);
            return null;
        }
        return element;
    }

    /**
     * Alterna a visibilidade de um elemento DOM.
     * @param {Element|string} element - O elemento DOM ou o seletor do elemento.
     */
    static toggleVisibility(element) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        if (!element) {
            return;
        }
        const currentStyle = window.getComputedStyle(element).display;
        element.style.display = (currentStyle === 'none' || currentStyle === '') ? 'block' : 'none';
    }
}


// Classe para requisições de rede
class Network {
    constructor() { }

    /**
     * Método auxiliar privado para fazer uma requisição de rede.
     * @private
     * @param {string} URL - A URL que será consultada.
     * @param {Object|FormData} data - Os dados da requisição.
     * @param {Object} [headers={}] - Headers adicionais para a requisição.
     * @returns {Promise} Uma promessa com o resultado da consulta.
     */
    static async _fetch(URL, data, headers = {}) {
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: data,
                headers,
            });
            return response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Consulta a URL informada com o método POST.
     * @param {Object} param - Um objeto com as propriedades URL e Data.
     * @param {string} param.URL - A URL que será consultada.
     * @param {Object} param.Data - Um objeto contendo os dados da requisição.
     * @returns {Promise} Uma promessa com o resultado da consulta.
     */
    async Consult({ URL, Data }) {
        return Network._fetch(URL, new URLSearchParams(Data).toString(), {
            "Content-type": "application/x-www-form-urlencoded",
        });
    }

    /**
     * Insere dados na URL informada com o método POST.
     * @param {string} URL - A URL que receberá os dados.
     * @param {FormData} Data - Um objeto FormData contendo os dados a serem inseridos.
     * @returns {Promise} Uma promessa com o resultado da inserção.
     */
    async Insert(URL, Data) {
        return Network._fetch(URL, Data);
    }

    /**
     * Busca informações adicionais e preenche no objeto Answers.
     * @param {Object} Answers - O objeto onde as respostas serão armazenadas.
     * @param {string} [url="https://www.cloudflare.com/cdn-cgi/trace"] - A URL de onde buscar as informações.
     */
    static async fetchAdditionalInfo(
        Answers,
        url = "https://www.cloudflare.com/cdn-cgi/trace"
    ) {
        try {
            const response = await fetch(url);
            let data = await response.text();

            data = data
                .trim()
                .split("\n")
                .reduce((obj, pair) => {
                    const [key, value] = pair.split("=");
                    obj[key] = value;
                    return obj;
                }, {});

            Object.entries(data).forEach(([key, val]) => {
                const formattedKey = key.replaceAll(/-|_/g, "");
                const formattedValue = !isNaN(val) ? Number(val) : val;
                Answers[formattedKey] = {
                    text: formattedKey,
                    value: formattedValue,
                };
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}


class CookieAndURLManager {
    /**
     * Preenche o objeto Answers com parâmetros vindos da URL.
     * @param {Object} Answers - Objeto onde as respostas serão armazenadas.
     */
    static fillAnswersFromURLParameters(Answers) {
        const urlParams = Utils.getAllURLParameters();
        this._fillAnswers(Answers, urlParams);
    }

    /**
     * Preenche o objeto Answers com valores vindos dos cookies.
     * @param {Object} Answers - Objeto onde as respostas serão armazenadas.
     */
    static fillAnswersFromCookies(Answers) {
        const cookies = Utils.getAllCookies();
        this._fillAnswers(Answers, cookies);
    }

    /**
     * Preenche o objeto Answers com os dados fornecidos.
     * Método auxiliar para evitar duplicação de código.
     * @private
     * @param {Object} Answers - Objeto onde as respostas serão armazenadas.
     * @param {Object} data - Dados para preencher em Answers.
     */
    static _fillAnswers(Answers, data) {
        for (const [key, value] of Object.entries(data)) {
            const formattedKey = key.replaceAll(/-|_/g, "");
            Answers[formattedKey] = { text: formattedKey, value: value };
        }
    }
}


class EventTracker {
    /**
     * Envia um evento para o Google Tag Manager.
     * @param {string} event - O nome do evento.
     * @param {Object} [data] - Dados adicionais a serem enviados.
     */
    static sendGTMEvent(event, data = {}) {
        if (window.dataLayer) {
            window.dataLayer.push({ event, ...data });
        } else {
            console.warn("Google Tag Manager não está inicializado");
        }
    }

    /**
     * Envia um evento padrão para o Facebook Ads.
     * @param {string} event - O nome do evento.
     * @param {Object} [data] - Dados adicionais a serem enviados.
     * @param {Object} [options] - Opções adicionais.
     */
    static sendFBStandardEvent(event, data = {}, options = {}) {
        if (typeof fbq !== "undefined") {
            fbq("track", event, data, options);
        } else {
            console.warn("Facebook Pixel não está inicializado");
        }
    }

    /**
     * Envia um evento customizado para o Facebook Ads.
     * @param {string} event - O nome do evento.
     * @param {Object} [data] - Dados adicionais a serem enviados.
     * @param {Object} [options] - Opções adicionais.
     */
    static sendFBCustomEvent(event, data = {}, options = {}) {
        if (typeof fbq !== "undefined") {
            fbq("trackCustom", event, data, options);
        } else {
            console.warn("Facebook Pixel não está inicializado");
        }
    }

    /**
     * Envia um evento para a plataforma especificada.
     * @param {string} platform - A plataforma para enviar o evento ("GTM" ou "FB").
     * @param {string} type - O tipo de evento ("standard" ou "custom").
     * @param {string} event - O nome do evento.
     * @param {Object} [data] - Dados adicionais a serem enviados.
     * @param {Object} [options] - Opções adicionais.
     */
    static sendEvent(platform, type, event, data = {}, options = {}) {
        switch (platform) {
            case "GTM":
                this.sendGTMEvent(event, data);
                break;
            case "FB":
                if (type === "standard") {
                    this.sendFBStandardEvent(event, data, options);
                } else if (type === "custom") {
                    this.sendFBCustomEvent(event, data, options);
                }
                break;
            default:
                console.warn("Plataforma não suportada");
        }
    }
}


class Logger {
    constructor() {
        // Define os níveis de log disponíveis e sua ordem
        this.levels = new Map([
            ['debug', 1],
            ['info', 2],
            ['warn', 3],
            ['error', 4]
        ]);
        this.minLogLevel = 'debug'; // O nível mínimo de log padrão
    }

    /**
     * Define o nível mínimo de log.
     * @param {string} level - Nível de log.
     */
    setMinLogLevel(level) {
        if (this.levels.has(level)) {
            this.minLogLevel = level;
        } else {
            console.warn(`Nível de log "${level}" não existe. Níveis disponíveis: ${Array.from(this.levels.keys())}`)
        }
    }

    /**
     * Verifica se o log deve ser feito com base no nível mínimo.
     * @param {string} level - Nível de log.
     * @returns {boolean} - Se deve ou não fazer log.
     */
    shouldLog(level) {
        return this.levels.get(level) >= this.levels.get(this.minLogLevel);
    }

    /**
     * Faz log da mensagem e parâmetros com base no nível fornecido.
     * @param {string} level - Nível de log.
     * @param {string} message - Mensagem para log.
     * @param  {...any} params - Parâmetros adicionais.
     */
    log(level, message, ...params) {
        if (this.shouldLog(level)) {
            console[level](message, ...params);
        }
    }

    // Atalhos para os diferentes níveis de log

    debug(message, ...params) {
        this.log('debug', message, ...params);
    }

    info(message, ...params) {
        this.log('info', message, ...params);
    }

    warn(message, ...params) {
        this.log('warn', message, ...params);
    }

    error(message, ...params) {
        this.log('error', message, ...params);
    }
}