<?php

/**
 * Plugin Name: MKT Code ChatBots
 * Description: Um chatbot simples para WordPress.
 * Version: 1.0
 * Author: Flavio Moreira
 */


// Initialize main class
require_once plugin_dir_path(__FILE__) . 'includes/class-chatbot.php';
$chatBot = new ChatBot('chatbot', '1.0.0');
$chatBot->init();


// Initialize admin class
require_once plugin_dir_path(__FILE__) . 'includes/class-chatbot-admin.php';
$chatBotAdmin = new ChatBot_Admin('chatbot', '1.0.0');
$chatBotAdmin->init();