/**
 * External dependencies
 */
import { assert } from 'chai';

/**
 * Internal dependencies
 */
import { CONTACT_FORM_DEFAULT, CONTACT_FORM_DEFAULT_NEW_FIELD } from './constants';
import { CONTACT_FORM_INIT, CONTACT_FORM_ADD_DEFAULT_FIELD, CONTACT_FORM_REMOVE_FIELD } from '../action-types';
import { initContactForm, addDefaultField, removeField } from '../actions';

describe( 'actions', () => {
	it( 'should return an action object to initialize the store', () => {
		const action = initContactForm( CONTACT_FORM_DEFAULT );

		console.log( action );

		assert.deepEqual( action, {
			type: CONTACT_FORM_INIT,
			contactForm: CONTACT_FORM_DEFAULT
		} );
	} );
} );
