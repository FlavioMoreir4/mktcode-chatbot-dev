<!-- ... -->
<div id="mkt-chatbot-wrapper" class="chat-wrapper hidden">
    <div id="mkt-chatbot-icon" class="chat-icon chat-icon-position-right">
        <div id="mkt-chatbot-message" class="chat-message">
            Clique para conversar!
        </div>
        <div id="chatbot-icon-img" class="chat-avatar"></div>
    </div>
    <div id="mkt-chatbot" class="chat-main hidden">
        <!-- Cabeçalho do Chat -->
        <div id="mkt-chatbot-header" class="chat-header">
            <div class="chat-header-left">
                <div id="chatbot-header-img" class="chat-header-avatar"></div>
            </div>
            <div class="chat-header-info">
                <span id="mkt-chatbot-name" class="chat-header-name"
                    >Atendente</span
                >
                <span id="mkt-chatbot-status" class="chat-header-status"
                    >Online</span
                >
            </div>
            <div
                id="mkt-chatbot-minimize"
                class="chat-header-chatbot-minimize"
            ></div>
        </div>

        <!-- Log de Mensagens -->
        <div id="mkt-chatbot-log" class="chat-log">
            <!-- As mensagens serão adicionadas dinamicamente aqui -->
        </div>

        <!-- Inputs -->
        <!-- Wrapper para os inputs -->
        <div id="mkt-chatbot-inputs" class="chat-inputs">
            <!-- Container para inputs dinâmicos -->
            <div class="chat-inputs__dynamic">
                <input type="text" class="input--text">
                <!-- <a href="#" class="input--link">Continuar</a>
                <a href="#" class="input--link">Continuar</a> -->
                <!-- <button class="input--buttons">Sou eu</button>
                <button class="input--buttons">Outra pessoa</button> -->
            </div>
            <!-- Botão de enviar sempre presente -->
            <button class="chat-inputs__send-button"></button>
        </div>
    </div>
</div>
<!-- ... -->