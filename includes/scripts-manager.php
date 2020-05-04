<?php

namespace Getwid;

/**
 * Class ScriptsManager
 * @package Getwid
 */
class ScriptsManager {

	private $version;
	private $prefix;

	/**
	 * ScriptsManager constructor.
	 */
	public function __construct() {

		$settings = getwid()->settings();

		$this->version = $settings->getVersion();
		$this->prefix  = $settings->getPrefix();

		// Fires after block assets have been enqueued for the editing interface.
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueueEditorAssets'] );

		// Fires after enqueuing block assets for both editor and front-end.
		add_action( 'enqueue_block_assets', [ $this, 'enqueueFrontBlockAssets' ] );

		// section_content_width inline styles
		add_action( 'after_theme_setup', [ $this, 'enqueue_editor_section_css' ] );
	}

	public function get_image_sizes() {

		global $_wp_additional_image_sizes;

		$intermediate_image_sizes = get_intermediate_image_sizes();

		$image_sizes = array();
		foreach ( $intermediate_image_sizes as $size ) {
			if ( isset( $_wp_additional_image_sizes[ $size ] ) ) {
				$image_sizes[ $size ] = array(
					'width'  => $_wp_additional_image_sizes[ $size ][ 'width' ],
					'height' => $_wp_additional_image_sizes[ $size ][ 'height' ]
				);
			} else {
				$image_sizes[ $size ] = array(
					'width'  => intval( get_option( "{$size}_size_w" ) ),
					'height' => intval( get_option( "{$size}_size_h" ) )
				);
			}
		}

		$sizes_arr = [];
		foreach ( $image_sizes as $key => $value ) {
			$temp_arr = [];
			$temp_arr[ 'value' ] = $key;
			$temp_arr[ 'label' ] = ucwords( strtolower( preg_replace( '/[-_]/', ' ', $key ) ) ) . " - {$value['width']} x {$value['height']}";
			$sizes_arr[] = $temp_arr;
		}

		$sizes_arr[] = array(
			'value' => 'full',
			'label' => __( 'Full Size', 'getwid' )
		);

		return $sizes_arr;
	}

	public function load_locale_data() {
		$locale_data = $this->get_locale_data( 'getwid' );
		wp_add_inline_script(
			'wp-i18n',
			'wp.i18n.setLocaleData( ' . json_encode( $locale_data ) . ', "'. $this->prefix .'"  );'
		);
	}

	public function get_locale_data( $domain ) {
		$translations = get_translations_for_domain( $domain );

		$locale = array(
			'' => array(
				'domain' => $domain,
				'lang'   => is_admin() ? get_user_locale() : get_locale(),
			),
		);

		if ( ! empty( $translations->headers[ 'Plural-Forms' ] ) ) {
			$locale[ '' ][ 'plural_forms' ] = $translations->headers[ 'Plural-Forms' ];
		}

		foreach ( $translations->entries as $msgid => $entry ) {
			$locale[ $msgid ] = $entry->translations;
		}

		return $locale;
	}

	/**
	 * Enqueue editor-only js and css (Enqueue scripts (only on Edit Post Page))
	 */
	public function enqueueEditorAssets() {

		// Enqueue the bundled block JS file
		wp_enqueue_script(
			"{$this->prefix}-blocks-editor-js",
			getwid_get_plugin_url( 'assets/js/editor.blocks.js' ),
			apply_filters(
				'getwid/editor_blocks_js/dependencies',
				[
					'wp-i18n',
					'wp-editor',
					'wp-element',
					'wp-blocks',
					'wp-components',
					'wp-api',
					'wp-api-fetch',
				]
			),
			$this->version,
			true
		);

		//disabled blocks
		$disabledBlocks = [];
		$disabledBlocksData = [];
		if ( getwid()->blocksManager()->hasDisabledBlocks() ) {
			$disabledBlocks = getwid()->blocksManager()->getDisabledBlocks();
			foreach ( $disabledBlocks as $block ) {
				$disabledBlocksData[] = $block->getBlockName();
			}
		}

		$this->load_locale_data();

		wp_localize_script(
			"{$this->prefix}-blocks-editor-js",
			'Getwid',
			apply_filters(
				'getwid/editor_blocks_js/localize_data',
				[
					'localeData' => $this->get_locale_data( 'getwid' ),
					'disabled_blocks' => $disabledBlocksData,
					'settings' => [
						'wide_support' => get_theme_support( 'align-wide' ),
						'date_time_utc' => current_time('Y-m-d H:i:s'),
						'post_type' => get_post_type(),
						'google_api_key'  => get_option( 'getwid_google_api_key', '' ),
						'instagram_token' => get_option( 'getwid_instagram_token', '' ),

						'assets_path' => getwid_get_plugin_url( '/assets' ),
						'image_sizes' => $this->get_image_sizes(),

						'excerpt_length'       => apply_filters( 'excerpt_length', 55 ),
						'recaptcha_site_key'   => get_option( 'getwid_recaptcha_v2_site_key'  , '' ),
						'recaptcha_secret_key' => get_option( 'getwid_recaptcha_v2_secret_key', '' ),
						'mailchimp_api_key'    => get_option( 'getwid_mailchimp_api_key'      , '' ),
						'debug' => ( defined( 'WP_DEBUG' ) ? WP_DEBUG : false )
					],
					'templates' => [
						'name' => getwid()->postTemplatePart()->postType,
						'new' => admin_url( 'post-new.php?post_type=' . getwid()->postTemplatePart()->postType ),
						'view' => admin_url( 'edit.php?post_type=' . getwid()->postTemplatePart()->postType ),
						'edit' => admin_url( 'post.php?post=' )
					],
					'ajax_url' => admin_url( 'admin-ajax.php' ),
					'options_writing_url' => admin_url( 'options-writing.php' ),
					'nonces' => array(
						'google_api_key' => wp_create_nonce( 'getwid_nonce_google_api_key' ),
						'recaptcha_v2_contact_form' => wp_create_nonce( 'getwid_nonce_contact_form' ),
						'mailchimp_api_key' => wp_create_nonce( 'getwid_nonce_mailchimp_api_key' )
					)
				]
			)
		);

		// Enqueue optional editor only styles
		wp_enqueue_style(
			"{$this->prefix}-blocks-editor",
			getwid_get_plugin_url( 'assets/css/blocks.editor.css' ),
			apply_filters(
				'getwid/editor_blocks_css/dependencies',
				[]
			),
			$this->version
		);
	}

	/**
	 * Enqueue js and css for both editor and front-end
	 *
	 */
	public function enqueueFrontBlockAssets() {

		// *** Start of Backend & Frontend ***

		/**
		 * Assets optimization. Currently in Beta.
		 * @since 1.5.3
		 */
		//$_has_getwid_blocks = \Getwid\BlocksManager::getInstance()->hasGetwidBlocks();
		$_has_enabled_blocks = getwid()->blocksManager()->hasEnabledBlocks();
		//$_getwid_has_nested_blocks = \Getwid\BlocksManager::getInstance()->hasGetwidNestedBlocks();

		//getwid_log('enqueueFrontBlockAssets/hasGetwidBlocks', $_has_getwid_blocks );
		getwid_log('enqueueFrontBlockAssets/hasEnabledBlocks', $_has_enabled_blocks );
		//getwid_log('enqueueFrontBlockAssets/has_getwid_nested_blocks', $_getwid_has_nested_blocks );

		if ( $_has_enabled_blocks ) {

			wp_enqueue_style(
				"{$this->prefix}-blocks",
				getwid_get_plugin_url( 'assets/css/blocks.style.css' ),

				// section, banner, icon-box, icon, image-box, image-hotspot, media-text-slider, video-popup, post-carousel, post-slider, images-slider
				apply_filters(
					'getwid/blocks_style_css/dependencies',
					[]
				),
				$this->version
			);

			wp_add_inline_style( "{$this->prefix}-blocks", getwid_generate_section_content_width_css() );

		}

		// *** End of Backend & Frontend ***

		/**
		 * Assets optimization. Currently in Beta.
		 * @since 1.5.3
		 */
		if ( is_admin() || ! $_has_enabled_blocks ) {
			return;
		}

		wp_enqueue_script(
			"{$this->prefix}-blocks-frontend-js",
			getwid_get_plugin_url( 'assets/js/frontend.blocks.js' ),
			apply_filters(
				'getwid/frontend_blocks_js/dependencies',
				[ 'jquery' ]
			),
			$this->version,
			true
		);

		wp_localize_script(
			"{$this->prefix}-blocks-frontend-js",
			'Getwid',
			apply_filters(
				'getwid/frontend_blocks_js/localize_data',
				[
					'settings'   => [
						'date_time_utc' => current_time( 'Y-m-d H:i:s' ),
						'google_api_key' => get_option( 'getwid_google_api_key', '' )
					],
					'ajax_url' => admin_url( 'admin-ajax.php' ),
					'nonces'   => array(
						'recaptcha_v2_contact_form' => wp_create_nonce( 'getwid_nonce_contact_form' )
					)
				]
			)
		);
	}

	function enqueue_editor_section_css() {
		add_editor_style( getwid_generate_section_content_width_css() );
	}
}
