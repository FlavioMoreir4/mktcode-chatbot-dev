document.addEventListener("DOMContentLoaded", function () {
    const wrapTheme = document.querySelector(".wrap-mkt")
    if (wrapTheme) {

        // Seleciona o elemento textarea pelo seu ID.
        var textArea = document.getElementById("custom-js");

        // Inicializa o editor CodeMirror.
        var editor = CodeMirror.fromTextArea(textArea, {
            lineNumbers: true,           // Números de linha
            mode: "javascript",          // Modo de linguagem
            theme: "material-darker",    // Tema
            lineWrapping: true,          // Quebra automática de linha
            foldGutter: true,             // Ativa o recolhimento de código
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // Ativa o recurso de recolhimento ao lado dos números de linha
            matchBrackets: true,         // Correspondência de colchetes
            autoCloseBrackets: true,     // Fecha automaticamente colchetes, chaves, etc.
            extraKeys: {
                "Ctrl-Space": "autocomplete",  // Ativa o autocompletar com Ctrl+Espaço
                "Cmd-Space": "autocomplete",   // Para usuários do MacOS
                "Tab": "indentAuto"            // Indentação automática com Tab
            }
        });

        // Carrega o autocompletar de JavaScript.
        editor.on("inputRead", function (instance, changeObj) {
            CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
        });


        const formTheme = document.getElementById("chatbot-form");
        formTheme.addEventListener("submit", function (e) {
            e.preventDefault();

            // Organizar dados
            const data = collectThemeFormData(formTheme);

            // Debug dos dados
            console.log(data);

            // Enviar dados para o servidor
            sendDataToServer(data);
        });
    }

    function collectThemeFormData(form) {
        const themeData = {};
        const formData = new FormData(form);

        formData.forEach((value, key) => {
            themeData[key] = value;
        });
        return {
            action: 'save_chatbot_theme_settings',
            theme_settings: themeData,
            nonce: chatbot_admin_ajax.nonce
        };
    }
    function sendDataToServer(data = {}) {
        jQuery.ajax({
            url: chatbot_admin_ajax.ajax_url,
            type: 'POST',
            data: data,
            success: function (response) {
                if (response.success) {
                    // Debugar resultado
                    console.log(response.data);
                } else {
                    //Debugar
                    console.log(response);
                }
            },
            error: function (e) {
                //Debugar
                console.log('Erro', e);
            }
        });
    }
});
