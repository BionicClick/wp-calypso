/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import media from './media/reducer';
import forms from './forms/reducer';

export default combineReducers( {
	media,
	forms
} );
