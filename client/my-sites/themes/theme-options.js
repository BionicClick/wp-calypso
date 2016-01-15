/**
 * External dependencies
 */
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';
import pick from 'lodash/object/pick';
import partial from 'lodash/function/partial';

/**
 * Internal dependencies
 */
import Helper from 'lib/themes/helpers';
import actionLabels from './action-labels';

export function getButtonOptions( site, isLoggedOut, actions, setSelectedTheme, togglePreview ) {
	const buttonOptions = {
		signup: {
			getUrl: theme => Helper.getSignupUrl( theme ),
			isHidden: ! isLoggedOut
		},
		preview: {
			hasAction: true,
			hideForTheme: theme => theme.active
		},
		purchase: {
			hasAction: true,
			isHidden: isLoggedOut,
			hideForTheme: theme => theme.active || theme.purchased || ! theme.price
		},
		activate: {
			hasAction: true,
			isHidden: isLoggedOut,
			hideForTheme: theme => theme.active || ( theme.price && ! theme.purchased )
		},
		customize: {
			hasAction: true,
			isHidden: isLoggedOut && ( site && ! site.isCustomizable() ),
			hideForTheme: theme => ! theme.active
		},
		separator: {
			separator: true
		},
		details: {
			getUrl: theme => Helper.getDetailsUrl( theme, site ),
		},
		support: {
			getUrl: theme => Helper.getSupportUrl( theme, site ),
			isHidden: site && site.jetpack // We don't know where support docs for a given theme on a self-hosted WP install are.
		},
	};

	let options = pick( buttonOptions, option => ! option.isHidden );
	options = mapValues( options, appendLabelAndHeader );
	options = mapValues( options, appendAction );
	return options;

	function appendLabelAndHeader( option, name ) {
		const actionLabel = actionLabels[ name ];

		if ( ! actionLabel ) {
			return option;
		}

		const { label, header } = actionLabel;

		return assign( {}, option, {
			label, header
		} );
	};

	function appendAction( option, name ) {
		const { hasAction } = option;

		if ( ! hasAction ) {
			return option;
		}

		let action;
		if ( name === 'preview' ) {
			action = togglePreview;
		} else if ( site ) {
			action = partial( actions[ name ], partial.placeholder, site, 'showcase' );
		} else {
			action = setSelectedTheme.bind( null, name );
		}

		return assign( {}, option, {
			action: trackedAction( action, name )
		} );
	}

	function trackedAction( action, name ) {
		return t => {
			action( t );
			Helper.trackClick( 'more button', name );
		};
	}
};
