<?php

// Certifique-se de que o WordPress está em execução
if (!defined('ABSPATH')) {
    exit; // Saída se o WordPress não estiver em execução
}

class ChatBot_Admin
{
    private $plugin_name;
    private $version;

    /**
     * Construtor da classe.
     *
     * @param string $plugin_name Nome do plugin.
     * @param string $version Versão do plugin.
     */
    public function __construct($plugin_name, $version)
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Inicializar a classe e definir seus ganchos (hooks).
     */
    public function init()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('wp_ajax_save_chatbot_theme_settings', [$this, 'save_theme_settings']);
    }

    /**
     * Enfileirar estilos e scripts para o painel de administração.
     */
    public function enqueue_assets()
    {
        $this->enqueue_styles();
        $this->enqueue_scripts();
    }
    /**
     * Enfileira os estilos CSS necessários para o painel de administração.
     * Isso inclui os estilos básicos do plugin, bem como os estilos do CodeMirror e seus add-ons.
     */
    private function enqueue_styles()
    {
        wp_enqueue_style($this->plugin_name . '-admin', plugin_dir_url(__FILE__) . '../admin/css/admin.min.css', [], $this->version, 'all');
        wp_enqueue_style('codemirror-css', plugin_dir_url(__FILE__) . '../admin/codemirror/lib/codemirror.css', [], $this->version, 'all');
        wp_enqueue_style('codemirror-show-hint', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/hint/show-hint.css', [], $this->version, 'all');
        wp_enqueue_style('codemirror-theme', plugin_dir_url(__FILE__) . '../admin/codemirror/theme/material-darker.css', [], $this->version, 'all');
        wp_enqueue_style('codemirror-foldgutter', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/fold/foldgutter.css', [], $this->version, 'all');
    }

    /**
     * Enfileira os scripts JavaScript necessários para o painel de administração.
     * Isso inclui os scripts básicos do plugin, bem como os scripts do CodeMirror e seus add-ons.
     */
    private function enqueue_scripts()
    {
        wp_enqueue_script($this->plugin_name . '-admin', plugin_dir_url(__FILE__) . '../admin/js/admin.min.js', ['jquery'], $this->version, true);
        wp_enqueue_script('codemirror-js', plugin_dir_url(__FILE__) . '../admin/codemirror/lib/codemirror.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-mode', plugin_dir_url(__FILE__) . '../admin/codemirror/mode/javascript/javascript.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-foldcode', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/fold/foldcode.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-foldgutter', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/fold/foldgutter.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-brace-fold', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/fold/brace-fold.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-comment-fold', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/fold/comment-fold.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-indent-fold', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/fold/indent-fold.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-show-hint', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/hint/show-hint.js', [], $this->version, true);
        wp_enqueue_script('codemirror-js-addon-javascript-hint', plugin_dir_url(__FILE__) . '../admin/codemirror/addon/hint/javascript-hint.js', [], $this->version, true);
        wp_localize_script($this->plugin_name . '-admin', 'chatbot_admin_ajax', $this->get_localized_script_data());
    }

    /**
     * Obter dados para localização de script.
     *
     * @return array
     */
    private function get_localized_script_data()
    {
        return [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('chatbot_admin_nonce'),
            'stored_theme' => get_option('theme_settings', [])
        ];
    }

    /**
     * Adicionar página de menu no painel de administração.
     */
    public function add_admin_menu()
    {
        add_menu_page('Configurações do ChatBot', 'ChatBot', 'manage_options', 'chatbot', [$this, 'display_admin_page']);
    }

    /**
     * Exibir a página de configurações no painel de administração.
     */
    public function display_admin_page()
    {
        include_once plugin_dir_path(__FILE__) . '../admin/partials/admin-display.php';
    }

    /**
     * Salvar as configurações de tema.
     */
    public function save_theme_settings()
    {
        // Verificar nonce para segurança
        check_ajax_referer('chatbot_admin_nonce', 'nonce');

        $theme_settings = $_POST['theme_settings'] ?? null;

        if (!is_array($theme_settings)) {
            wp_send_json_error('Dados inválidos');
            return;
        }

        // Opcionalmente, desinfete os elementos da matriz aqui
        update_option('theme_settings', $theme_settings);

        wp_send_json_success('Configurações salvas');
    }
}
