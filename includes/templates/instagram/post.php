<?php
/**
 * Post template in Instagram Block
 */

$block_name = $extra_attr['block_name'];
$post = $extra_attr['post'];
$alt = '';

if ( isset($post->caption) ) {
	$alt = wp_trim_words( $post->caption );
}

?>
<div class="<?php echo esc_attr($block_name) . '__item'; ?>">
	<div class="<?php echo esc_attr($block_name) . '__media-wrapper'; ?>">
		<a class="<?php echo esc_attr($block_name) . '__media-link'; ?>" target="_blank" href="<?php echo esc_url($post->permalink); ?>">
			<?php if ($post->media_type == 'IMAGE') { ?>
				<img class="<?php echo esc_attr($block_name) . '__media'; ?>" src="<?php echo esc_url($post->media_url); ?>" alt="<?php echo esc_attr($alt); ?>"/>
			<?php } elseif ($post->media_type == 'VIDEO'){ ?>
				<img class="<?php echo esc_attr($block_name) . '__media'; ?>" src="<?php echo esc_url($post->thumbnail_url); ?>" alt="<?php echo esc_attr($alt); ?>"/>
			<?php } ?>
		</a>
	</div>
</div>