// Importing accordion
import BadgerAccordion from 'badger-accordion';

const accordions = document.querySelectorAll( '.js-badger-accordion' );

Array.from( accordions ).forEach( ( accordion ) => {
	const ba = new BadgerAccordion( accordion );
} );
