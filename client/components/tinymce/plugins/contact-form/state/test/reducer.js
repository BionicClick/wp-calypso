/**
 * External dependencies
 */
import { assert } from 'chai';

/**
 * Internal dependencies
 */
import reducer from '../reducer';
import { CONTACT_FORM_DEFAULT, CONTACT_FORM_DEFAULT_NEW_FIELD } from '../constants';
import { CONTACT_FORM_INIT, CONTACT_FORM_ADD_DEFAULT_FIELD, CONTACT_FORM_REMOVE_FIELD } from '../action-types';

describe( "editor's contact form state reducer", () => {
	it( 'should return the default contact form when neither state nor action is provided', () => {
		const state = reducer( undefined, {} );

		assert.deepEqual( state, CONTACT_FORM_DEFAULT );
	} );

	it( 'should initialize the state with the provided contact form', () => {
		const contactForm = {
			to: 'user@example.com',
			subject: 'here be dragons',
			fields: [
				{ label: 'Name' },
				{ label: 'Email' },
				{ label: 'Website' },
				{ label: 'Comment' }
			]
		};

		const state = reducer( null, {
			type: CONTACT_FORM_INIT,
			contactForm
		} );

		assert.deepEqual( state, contactForm );
	} );

	it( "should add the default new field to the state's fields list", () => {
		let contactForm = {
			fields: [
				{ label: 'Name' },
				{ label: 'Email' },
				{ label: 'Website' },
				{ label: 'Comment' }
			]
		};

		const state = reducer( contactForm, {
			type: CONTACT_FORM_ADD_DEFAULT_FIELD
		} );
		contactForm.fields.push( CONTACT_FORM_DEFAULT_NEW_FIELD );

		assert.deepEqual( state, contactForm );
	} );

	it( "should remove a field from the state's fields list", () => {
		const contactForm = {
			fields: [
				{ label: 'Name' },
				{ label: 'Email' },
				{ label: 'Website' },
				{ label: 'Comment' }
			]
		};

		const state = reducer( contactForm, {
			type: CONTACT_FORM_REMOVE_FIELD,
			index: 2
		} );

		assert.deepEqual( state, {
			fields: [
				{ label: 'Name' },
				{ label: 'Email' },
				{ label: 'Comment' }
			]
		} );
	} );
} );
