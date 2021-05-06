<?php

namespace Getwid\Blocks;

class AcfImage extends \Getwid\Blocks\AbstractBlock {

	protected static $blockName = 'getwid/template-acf-image';

    public function __construct() {

		parent::__construct( self::$blockName );

        register_block_type(
            self::$blockName,
            array(
                'attributes' => array(
                	'align' => array(
						'type' => 'string'
					),
					'linkTo' => array(
						'type' => 'string',
						'default' => 'none'
					),
                    'customField' => array(
                        'type' => 'string'
                    ),
                    'imageSize' => array(
						'type' => 'string',
						'default' => 'large'
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
        if ( ( get_post_type() == getwid()->postTemplatePart()->postType ) || ( get_post_type() == 'revision' ) ){
            return $content;
        }

        $block_name    = 'wp-block-getwid-template-acf-image';

        $wrapper_class = $block_name;

        if ( isset( $attributes[ 'className' ] ) ) {
            $wrapper_class .= ' ' . esc_attr( $attributes[ 'className' ] );
        }

        if ( isset( $attributes[ 'customField' ] ) ) {
			$wrapper_class .= ' ' . 'custom-field-' . esc_attr( $attributes[ 'customField' ] );
		}

		if ( isset( $attributes[ 'align' ] ) ) {
			$wrapper_class .= ' align' . esc_attr( $attributes[ 'align' ] );
		}

        $imageSize = ( ( isset( $attributes[ 'imageSize' ] ) && $attributes[ 'imageSize' ] ) ? $attributes[ 'imageSize' ] : 'post-thumbnail' );

        $result = '';

        $extra_attr = array(
            'wrapper_class' => $wrapper_class,
            'imageSize'		=> $imageSize
        );

        if ( acf_is_active() && isset( $attributes[ 'customField' ] ) ) {
            ob_start();

            getwid_get_template_part( 'template-parts/acf/image', $attributes, false, $extra_attr );

            $result = ob_get_clean();
        }

        return $result;
    }
}

new \Getwid\Blocks\AcfImage();