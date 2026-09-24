export const WORDPRESS_INTEGRATION_CODE = {
  shortcode: `<?php
/**
 * Plugin Name: Akaber Real Estate Embed & Standalone Page
 * Description: Embeds the Akaber Real Estate & Development web app directly into any WordPress page via shortcode [akaber_portal] or full template.
 * Version: 1.0.0
 * Author: Akaber Real Estate Engineering
 */

if (!defined('ABSPATH')) exit;

function akaber_real_estate_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '100vh',
        'width' => '100%',
        'theme' => 'royal-navy',
        'lang' => 'en'
    ), $atts, 'akaber_portal');

    $app_url = site_url('/akaber-app/'); // or your hosted applet URL

    ob_start();
    ?>
    <div class="akaber-app-wrapper" style="width: <?php echo esc_attr($atts['width']); ?>; height: <?php echo esc_attr($atts['height']); ?>; position: relative; overflow: hidden; background: #070D1E; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <iframe 
            src="<?php echo esc_url($app_url . '?theme=' . $atts['theme'] . '&lang=' . $atts['lang']); ?>" 
            style="width: 100%; height: 100%; border: none; min-height: 800px;" 
            allow="camera; microphone; geolocation"
            loading="lazy"
            title="Akaber Real Estate Turkey">
        </iframe>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('akaber_portal', 'akaber_real_estate_shortcode');
`,
  pageTemplate: `<?php
/**
 * Template Name: Akaber Full-Width Luxury Portal
 * Description: Dedicated full-screen template for Akaber Real Estate Portal without theme header/footer clutter.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Akaber Real Estate Turkey | Portfolio</title>
    <?php wp_head(); ?>
    <style>
        html, body { margin: 0; padding: 0; height: 100%; background: #070D1E; overflow: auto; }
        #wpadminbar { display: none; }
    </style>
</head>
<body>
    <div id="akaber-root" style="width: 100%; min-height: 100vh;">
        <?php echo do_shortcode('[akaber_portal height="100vh"]'); ?>
    </div>
    <?php wp_footer(); ?>
</body>
</html>
`,
  elementorGuide: `Instructions for Elementor / Gutenberg:
1. Open any Page in WordPress.
2. Add an "HTML" or "Shortcode" block.
3. Paste [akaber_portal height="950px"] or paste the iframe snippet.
4. Set section width to "Full Width" and Column Gap to "No Gap".
5. Save and Publish.`
};
