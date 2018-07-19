<?php
/**
 * Plugin Name: BreezeBlocks
 * Plugin URI: https://github.com/brettsmason/breezeblocks
 * Description: A collection of layout blocks for Gutenberg.
 * Author: Brett Mason
 * Author URI: https://github.com/brettsmason/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package breezeBlocks
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Initialize blocks.
include plugin_dir_path( __FILE__ ) . '/blocks/init.php';
