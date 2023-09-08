<?php settings_fields('chatbot-theme-settings-group'); ?>
<?php do_settings_sections('chatbot-theme-settings-group'); ?>
<?php

function get_opt($input, $default_value)
{
    $theme_settings = get_option('theme_settings');
    return $theme_settings[$input] ?? $default_value;
}
?>

<div class="wrap-mkt">
    <h2>Painel de Administração do Chatbot</h2>
    <form id="chatbot-form" method="post">
        <fieldset>
            <legend>
                <h3>Código JavaScript Personalizado</h3>
            </legend>
            <textarea id="custom-js" name="custom_js"><?php echo stripslashes(get_opt('custom_js', '')); ?></textarea>
        </fieldset>
        <fieldset>
            <h3>Personalizar Thema</h3>
            <div class="theme-settings-group">
                <div class="theme-setting">
                    <label for="chat_background_color" class="theme-setting-label">Chat Background Color:</label>
                    <input type="color" name="chat_background_color" class="theme-setting-input" value="<?php echo esc_attr(get_opt('chat_background_color', '#333333')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="chat_header_background" class="theme-setting-label">Chat Header Background:</label>
                    <input type="color" name="chat_header_background" class="theme-setting-input" value="<?php echo esc_attr(get_opt('chat_header_background', '#333333')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="chat_header_text_color" class="theme-setting-label">Chat Header Text Color:</label>
                    <input type="color" name="chat_header_text_color" class="theme-setting-input" value="<?php echo esc_attr(get_opt('chat_header_text_color', '#ffffff')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="chat_header_status_color" class="theme-setting-label">Chat Header Status Color:</label>
                    <input type="color" name="chat_header_status_color" class="theme-setting-input" value="<?php echo esc_attr(get_opt('chat_header_status_color', '#d1d1d1')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="chat_message_background" class="theme-setting-label">Chat Message Background:</label>
                    <input type="color" name="chat_message_background" class="theme-setting-input" value="<?php echo esc_attr(get_opt('chat_message_background', '#ffffff')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="bot_message_background" class="theme-setting-label">Bot Message Background:</label>
                    <input type="color" name="bot_message_background" class="theme-setting-input" value="<?php echo esc_attr(get_opt('bot_message_background', '#aaaaaa')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="bot_message_text_color" class="theme-setting-label">Bot Message Text Color:</label>
                    <input type="color" name="bot_message_text_color" class="theme-setting-input" value="<?php echo esc_attr(get_opt('bot_message_text_color', '#333333')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="user_message_background" class="theme-setting-label">User Message Background:</label>
                    <input type="color" name="user_message_background" class="theme-setting-input" value="<?php echo esc_attr(get_opt('user_message_background', '#0095f6')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="user_message_text_color" class="theme-setting-label">User Message Text Color:</label>
                    <input type="color" name="user_message_text_color" class="theme-setting-input" value="<?php echo esc_attr(get_opt('user_message_text_color', '#cccccc')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="button_background" class="theme-setting-label">Button Background:</label>
                    <input type="color" name="button_background" class="theme-setting-input" value="<?php echo esc_attr(get_opt('button_background', '#0095f6')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="button_text_color" class="theme-setting-label">Button Text Color:</label>
                    <input type="color" name="button_text_color" class="theme-setting-input" value="<?php echo esc_attr(get_opt('button_text_color', '#ffffff')); ?>">
                </div>

                <div class="theme-setting">
                    <label for="inputs_background" class="theme-setting-label">Inputs Background:</label>
                    <input type="color" name="inputs_background" class="theme-setting-input" value="<?php echo esc_attr(get_opt('inputs_background', '#dfdfdf')); ?>">
                </div>
            </div>
        </fieldset>
        <div class="form-footer">
            <input type="submit" value="Salvar">
        </div>
    </form>
</div>