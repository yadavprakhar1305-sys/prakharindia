<?php
/**
 * Catch-all template: renders page/post content.
 *
 * @package Prakhar
 */
if (!defined('ABSPATH')) exit;
get_header();

while (have_posts()) : the_post(); ?>
<section class="page-header">
  <div class="container"></div>
</section>
<section class="content-section">
  <div class="container">
    <?php the_content(); ?>
  </div>
</section>
<?php endwhile;

get_footer();