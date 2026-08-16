<?php
/**
 * Page template.
 *
 * Inner pages carry their own `page-header` block inside the imported
 * content (bilingual titles + breadcrumb), so this template only wraps
 * `the_content()` with the standard container.
 *
 * @package Prakhar
 */
if (!defined('ABSPATH')) exit;
get_header();

while (have_posts()) : the_post(); ?>
<section class="content-section">
  <div class="container">
    <?php the_content(); ?>
  </div>
</section>
<?php endwhile;

get_footer();