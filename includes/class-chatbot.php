<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ChatBot
{

    private $plugin_name;
    private $version;

    public function __construct($plugin_name, $version)
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    public function init()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_styles']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('wp_footer', [$this, 'display_chat']);
        $this->register_ajax_hooks();
    }

    public function enqueue_styles()
    {
        wp_enqueue_style(
            $this->plugin_name,
            plugin_dir_url(__FILE__) . '../css/main.min.css',
            [],
            $this->version,
            'all'
        );
    }

    public function enqueue_scripts()
    {
        wp_enqueue_script(
            $this->plugin_name . '-api_client',
            plugin_dir_url(__FILE__) . '../js/util_class.min.js.',
            ['jquery'],
            $this->version,
            true
        );

        wp_enqueue_script(
            $this->plugin_name,
            plugin_dir_url(__FILE__) . '../js/chatbot.min.js',
            ['jquery'],
            $this->version,
            true
        );

        $stored_theme = get_option('theme_settings', '[]');


        // Aqui definimos as variavies globais css ques estao armazenadas em $stored_theme
        /*
        bot_message_background: "#4d4948"
        bot_message_text_color: "#ffffff"
        button_background: "#4daa6b"
        button_text_color: "#ffffff"
        chat_background_color: "#ffffff"
        chat_header_background: "#333333"
        chat_header_status_color: "#d1d1d1"
        chat_header_text_color: "#ffffff"
        chat_message_background: "#ffffff"
        */

        wp_add_inline_style(
            $this->plugin_name,
            ":root {
                --chat-background-color: " . $stored_theme['chat_background_color'] . ";
                --chat-header-background: " . $stored_theme['chat_header_background'] . ";
                --chat-header-text-color: " . $stored_theme['chat_header_text_color'] . ";
                --chat-header-status-color: " . $stored_theme['chat_header_status_color'] . ";
                --chat-message-background: " . $stored_theme['chat_message_background'] . ";
                --bot-message-background: " . $stored_theme['bot_message_background'] . ";
                --bot-message-text-color: " . $stored_theme['bot_message_text_color'] . ";
                --user-message-background: " . $stored_theme['user_message_background'] . ";
                --user-message-text-color: " . $stored_theme['user_message_text_color'] . ";
                --button-background: " . $stored_theme['button_background'] . ";
                --button-text-color: " . $stored_theme['button_text_color'] . ";
                --inputs-background: " . $stored_theme['inputs_background'] . ";
            }"
        );


        //Aqui passamos o algoritimo personalizado para ser executado apos o carregamento da pagina
        wp_add_inline_script(
            $this->plugin_name,
            `document.addEventListener("DOMContentLoaded", function () {
            ` .
                stripslashes($stored_theme['custom_js'])
                . `});`,
            'after'
        );



        // Aqui nós passamos variáveis ​​PHP para o nosso script JavaScript
        wp_localize_script(
            $this->plugin_name,
            'chatbot_ajax',
            [
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce'    => wp_create_nonce('chatbot_nonce'),
                'stored_theme' => $stored_theme,
            ]
        );
    }

    public function display_chat()
    {
        include_once plugin_dir_path(__FILE__) . '../partials/chatbot.php';
    }

    public function process_message()
    {
        // Implementação futura para processar mensagens
    }

    public function register_ajax_hooks()
    {
        add_action('wp_ajax_process_message', [$this, 'process_message']); // Para usuários logados
        add_action('wp_ajax_nopriv_process_message', [$this, 'process_message']); // Para usuários não logados
    }
}
