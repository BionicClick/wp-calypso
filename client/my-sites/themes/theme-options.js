/**
 * External dependencies
 */
import titleCase from 'to-title-case';
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
			hasUrl: true,
			isHidden: ! isLoggedOut
		},
		preview: {
			hasAction: true,
			hasUrl: false,
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
			hasUrl: true
		},
		support: {
			hasUrl: true,
			isHidden: site && site.jetpack // We don't know where support docs for a given theme on a self-hosted WP install are.
		},
	};

	let options = pick( buttonOptions, option => ! option.isHidden );
	options = mapValues( options, appendLabelAndHeader );
	options = mapValues( options, appendUrl );
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

	function appendUrl( option, name ) {
		const { hasUrl } = option;

		if ( ! hasUrl ) {
			return option;
		}

		const methodName = `get${ titleCase( name ) }Url`;
		const getUrl = Helper[ methodName ];

		return assign( {}, option, {
			getUrl: partial( getUrl, partial.placeholder, site )
		} );
	}

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
