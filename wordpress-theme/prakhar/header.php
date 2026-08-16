<?php if (!defined('ABSPATH')) exit; ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="lc5jzONqf48BkJpnMOsXDYbIiTdCRteRANJCjCd8YIQ" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="header">
  <div class="header-inner">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">Prakhar India <span data-lang-en>Manpower &amp; Construction</span><span data-lang-hi>श्रम एवं निर्माण</span></a>
    <nav class="nav">
      <?php
      $current = prakhar_page_slug();
      prakhar_nav_item('home', 'Home', $current);
      prakhar_nav_item('about', 'About', $current);
      prakhar_nav_item('manpower', 'Manpower', $current);
      prakhar_nav_item('construction', 'Construction', $current);
      prakhar_nav_item('projects', 'Projects', $current);
      prakhar_nav_item('contact', 'Contact', $current);
      ?>
      <a href="tel:9044499111" style="color:var(--orange-500);font-weight:700;">📞 9044499111</a>
      <a href="<?php echo esc_url(home_url('/login/')); ?>">Login</a>
      <a href="<?php echo esc_url(home_url('/signup/')); ?>">Sign Up</a>
      <div class="lang-switch">
        <button data-lang="en" class="active">EN</button>
        <button data-lang="hi">हि</button>
      </div>
    </nav>
    <button class="mobile-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </div>
</header>