/**
 * External dependencies
 */
import { assert } from 'chai';

/**
 * Internal dependencies
 */
import { CONTACT_FORM_DEFAULT } from '../constants';
import { CONTACT_FORM_INIT, CONTACT_FORM_ADD_DEFAULT_FIELD, CONTACT_FORM_REMOVE_FIELD } from '../action-types';
import { initContactForm, addDefaultField, removeField } from '../actions';

describe( 'actions', () => {
	it( 'should return an action object to signal the initialization of the store', () => {
		const action = initContactForm( CONTACT_FORM_DEFAULT );

		assert.deepEqual( action, {
			type: CONTACT_FORM_INIT,
			contactForm: CONTACT_FORM_DEFAULT
		} );
	} );

	it( 'should return an action object to signal the creation of a new default field', () => {
		const action = addDefaultField();

		assert.deepEqual( action, { type: CONTACT_FORM_ADD_DEFAULT_FIELD } );
	} );

	it( 'should return an action object to signal the removal of a field by index', () => {
		const action = removeField( 1 );

		assert.deepEqual( action, {
			type: CONTACT_FORM_REMOVE_FIELD,
			index: 1
		} );
	} );
} );
