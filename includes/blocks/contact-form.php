<?php

function render_getwid_contact_form( $attributes ) {    

    $submit     = 'submit components-button is-button is-primary';
    $block_name = 'wp-block-getwid-contact-form';

    $class = $block_name;
    
    if ( isset( $attributes['backgroundColor'] ) ) {
        $submit .= ' has-background' . ' has-' . $attributes['backgroundColor'] . '-background-color';
    }

    if ( isset( $attributes['customBackgroundColor'] ) ) {
        $submit .= ' has-background';
        $style .= 'background-color:'. $attributes['customBackgroundColor'] . ';';
    }

    if ( isset( $attributes['textColor'] ) ) {
        $submit .= ' has-text-color' . ' has-' . $attributes['textColor'] . '-color';
    }

    if ( isset( $attributes['customTextColor'] ) ) {
        $submit .= ' has-text-color';
        $style .= 'color:'. $attributes['customTextColor'];
    }

    if ( isset( $attributes['align'] ) ) {
        $class .= ' align' . $attributes['align'];
    }

    $wrapper_class = $block_name.'__wrapper';

    $extra_attr = array(
        'block_name' => $block_name,
        'submit' => $submit,
        'style' => $style
    );

    ob_start();
?>

    <div class='<?php echo esc_attr( $class );?>'>
        <div class='<?php echo esc_attr( $wrapper_class );?>'>
            <?php getwid_get_template_part('contact-form/message', $attributes, false, $extra_attr); ?>
        </div>
    </div>

<?php

    $result = ob_get_clean();
    return $result;
}

register_block_type(
    'getwid/contact-form',
    array(
        'attributes' => array(
            'to' => array(
                'type' => 'string',
                'default' => '',
            ),
            'subject' => array(
                'type' => 'string',
                'default' => '',
            ),			
            'align' => array(
                'type' => 'string',
            ),
            'backgroundColor' => array(
                'type' => 'string',
            ),
            'textColor' => array(
                'type' => 'string',
            ),
            'customBackgroundColor' => array(
                'type' => 'string',
            ),
            'customTextColor' => array(
                'type' => 'string',
            )
        ),
        'render_callback' => 'render_getwid_contact_form',
    )
);

