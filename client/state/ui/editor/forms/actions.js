/**
 * Internal dependencies
 */
import { CONTACT_FORM_INIT, CONTACT_FORM_ADD_DEFAULT_FIELD, CONTACT_FORM_REMOVE_FIELD } from './action-types';

/**
 * Returns an action object to be used in signalling that a contact form dialog
 * has to be initialized.
 *
 * @param  {Object} contactForm
 * @return {Object} Action object
 */
export function initContactForm( contactForm ) {
	return {
		type: CONTACT_FORM_INIT,
		contactForm
	};
}

export function addDefaultField() {
	return { type: CONTACT_FORM_ADD_DEFAULT_FIELD };
}

export function removeField( index ) {
	return {
		type: CONTACT_FORM_REMOVE_FIELD,
		index
	}
}
