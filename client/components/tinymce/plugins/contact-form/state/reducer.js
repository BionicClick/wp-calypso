/**
 * Internal dependencies
 */
import { CONTACT_FORM_INIT, CONTACT_FORM_ADD_DEFAULT_FIELD, CONTACT_FORM_REMOVE_FIELD } from './action-types';
import { CONTACT_FORM_DEFAULT, CONTACT_FORM_DEFAULT_NEW_FIELD } from './constants';

export default function( state = CONTACT_FORM_DEFAULT, action ) {
	switch ( action.type ) {
		case CONTACT_FORM_INIT:
			state = Object.assign( {}, action.contactForm || CONTACT_FORM_DEFAULT );
			break;
		case CONTACT_FORM_ADD_DEFAULT_FIELD:
			state = Object.assign( {}, state, {
				fields: [ ...state.fields, CONTACT_FORM_DEFAULT_NEW_FIELD ]
			} );
			break;
		case CONTACT_FORM_REMOVE_FIELD:
			const { index } = action;
			state.fields.splice( index, 1 );
			state = Object.assign( {}, state );
			break;
	}

	return state;
}
