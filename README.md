MKT ChatBot
===========

> Projeto `mkt-chatbot` para WordPress

![Demo](Animação.gif)

Sumário
-------

-   [Descrição](#descri%C3%A7%C3%A3o)
-   [Versão](#vers%C3%A3o)
-   [Requisitos](#requisitos)
-   [Instalação](#instala%C3%A7%C3%A3o)
    -   [Via npm](#via-npm)
    -   [Via WordPress](#via-wordpress)
-   [Scripts Disponíveis](#scripts-dispon%C3%ADveis)
    -   [Desenvolvimento](#desenvolvimento)
    -   [Produção](#produ%C3%A7%C3%A3o)
-   [Uso](#uso)
-   [Arquitetura](#arquitetura)
    -   [Classes e Funções Principais](#classes-e-fun%C3%A7%C3%B5es-principais)
    -   [Fluxo de Dados](#fluxo-de-dados)
-   [Documentação Adicional](#documenta%C3%A7%C3%A3o-adicional)
-   [Contribuindo](#contribuindo)
-   [Licença](#licen%C3%A7a)
-   [Autor](#autor)
-   [Redes Sociais e Empresa](#redes-sociais-e-empresa)

Descrição
---------

ChatBot criado para interagir com usuários e coletar informações diversas. Este projeto é especialmente desenvolvido para WordPress e vem com funcionalidades pré-configuradas para facilitar o marketing digital.

Versão
------

1.0.0

Requisitos
----------

-   Node.js
-   PHP
-   WordPress

Instalação
----------

### Via npm

bash

`npm install`

### Via WordPress

1.  Faça o upload da pasta `dist/mktcode-chatbot` para o diretório `/wp-content/plugins/` do seu site WordPress.
2.  Ative o plugin no painel administrativo do WordPress através da seção 'Plugins'.

Scripts Disponíveis
-------------------

### Desenvolvimento

-   `npm run dev`: Executa tarefas padrão para desenvolvimento.

### Produção

-   `npm run build`: Compila e prepara os arquivos para produção, os arquivos serão salvos em `dist/mktcode-chatbot`.

Uso
---

Para iniciar o ambiente de desenvolvimento:

bash

`npm run dev`

Para iniciar o chatbot no WordPress:

1.  Vá até o painel administrativo do WordPress.
2.  Navegue até 'Plugins' e ative o `MKT Code ChatBots`.

Arquitetura
-----------

### Classes e Funções Principais

-   `ChatBot`: Classe responsável pela lógica principal do chatbot.
-   `ChatBot_Admin`: Classe responsável pela interface administrativa no WordPress.

### Fluxo de Dados

1.  Inicializa o `ChatBot` e o `ChatBot_Admin`.
2.  Integração com WordPress através do hook de ativação do plugin.
3.  Monitora o progresso da conversa e interage com o usuário.
4.  Envia dados coletados para o servidor remoto.

Documentação Adicional
----------------------

Para mais informações sobre a estrutura e funcionamento das classes JavaScript, você pode consultar os seguintes documentos:

-   [ClassesJS.md](ClassesJS.md) - Este documento oferece uma visão geral das classes JavaScript utilizadas neste projeto.
-   [ChatBot.md](ChatBot.md) - Este documento fornece informações detalhadas sobre a classe `ChatBot`, explicando seus métodos e atributos.

Contribuindo
------------

Para contribuir, siga as seguintes etapas:

1.  Faça um fork do repositório.
2.  Crie um novo branch.
3.  Faça suas alterações e comite-as.
4.  Abra uma solicitação pull.

Licença
-------

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

Autor
-----

-   **Flavio Moreira**

### Redes Sociais e Empresa

-   Twitter: [@flaviomoreir4](https://twitter.com/flaviomoreir4)
-   Instagram: [@flaviomoreir4](https://instagram.com/flaviomoreir4)
-   LinkedIn: [flaviomoreir4](https://linkedin.com/in/flaviomoreir4)

#### Empresa

**MC - Marketing & Code**

-   Instagram: [@mktcode.digital](https://instagram.com/mktcode.digital)
-   Website: [mktcode.digital](https://mktcode.digital)