<?php

namespace BreezeBlocks;

/**
 * Enqueue scripts/styles for the editor.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
add_action( 'enqueue_block_editor_assets', function() {

	wp_enqueue_script(
        'breezeblocks-js',
        plugins_url( 'dist/js/blocks.editor.js', __DIR__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/js/blocks.editor.js' )
    );

    wp_enqueue_style(
		'breezeblocks-style',
		plugins_url( 'dist/css/blocks.editor.css', dirname( __DIR__ ) ),
        [ 'wp-blocks' ],
        filemtime( plugin_dir_path( __DIR__ ) . 'dist/css/blocks.style.css' )
	);
}, 5 );

/**
 * Enqueue front end and editor JavaScript and CSS assets.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
add_action( 'enqueue_block_assets', function() {

	wp_enqueue_style(
        'breezeblocks-editor-style',
        plugins_url( 'dist/css/blocks.style.css', __DIR__ ),
		[ 'wp-blocks' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/css/blocks.style.css' )
	);
}, 5 );
