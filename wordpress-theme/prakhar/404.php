<?php
/**
 * 404 template.
 *
 * @package Prakhar
 */
if (!defined('ABSPATH')) exit;
get_header();
?>
<section class="page-header">
  <div class="container">
    <h1 data-lang-en>Page Not Found</h1>
    <h1 data-lang-hi>पृष्ठ नहीं मिला</h1>
    <p data-lang-en>Sorry, the page you are looking for does not exist.</p>
    <p data-lang-hi>क्षमा करें, आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है।</p>
    <div style="margin-top:24px;">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">Home</a>
    </div>
  </div>
</section>
<?php get_footer();