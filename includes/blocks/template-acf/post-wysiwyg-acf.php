<?php

namespace Getwid\Blocks;

class PostWysiwygField extends \Getwid\Blocks\AbstractBlock {

	protected static $blockName = 'getwid/template-wysiwyg-acf';

    public function __construct() {

		parent::__construct( self::$blockName );

        register_block_type(
			self::$blockName,
			array(
				'attributes' => array(
					'customField' => array(
						'type' => 'string'
					),
					'className' => array(
						'type' => 'string'
					),
				),
				'render_callback' => [ $this, 'render_callback' ]
			)
		);
    }

    public function render_callback( $attributes, $content ) {

        //Not BackEnd render if we view from template page
        if ( (get_post_type() == getwid()->postTemplatePart()->postType) || (get_post_type() == 'revision') ){
            return $content;
        }

        $block_name    = 'wp-block-getwid-template-post-custom-field';
        $wrapper_class = $block_name;

        if ( isset( $attributes[ 'className' ] ) ) {
            $wrapper_class .= ' '.esc_attr( $attributes[ 'className' ] );
        }

        $result = '';

        $extra_attr = array(
            'wrapper_class' => $wrapper_class
		);

        if ( isset( $attributes[ 'customField' ] ) ) {
            ob_start();

            getwid_get_template_part( 'template-acf/post-wysiwyg-acf', $attributes, false, $extra_attr );

            $result = ob_get_clean();
        }

        return $result;
    }
}

new \Getwid\Blocks\PostWysiwygField();
