/**
 * Internal dependencies
 */
import Shortcode from 'lib/shortcode';

export function serialize( contactForm ) {
	const fields = contactForm.fields.map( field => {
		let fielShortcode = {
			tag: 'contact-field',
			type: 'self-closing',
			attrs: {
				label: field.label,
				type: field.type
			}
		};

		//only add required field of specified.
		if ( field.required ) {
			fielShortcode.attrs.required = 1;
		}

		return Shortcode.stringify( fielShortcode );
	} ).join( '' );

	return Shortcode.stringify( {
		tag: 'contact-form',
		type: 'closed',
		content: fields,
		attrs: {
			to: contactForm.to,
			subject: contactForm.subject
		}
	} );
};

export function deserialize( shortcode ) {
	if ( ! shortcode ) {
		return null;
	}

	let settings = Shortcode.parse( shortcode );
	let { to, subject } = settings.attrs.named;
	let fieldsShortcode = settings.content;
	let fields = [];
	let result;

	while ( fieldsShortcode && ( result = Shortcode.next( 'contact-field', fieldsShortcode ) ) ) {
		fields.push( result.shortcode.attrs.named );
		fieldsShortcode = fieldsShortcode.slice( result.index + result.content.length )
	}

	return { to, subject, fields };
}
