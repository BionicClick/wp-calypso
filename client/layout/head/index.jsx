/** @ssr-ready **/

/**
 * External dependencies
 */
import React from 'react';
import Helmet from 'react-helmet';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import decodeEntities from 'lib/formatting/decode-entities';

const debug = debugFactory( 'calypso:layout:head' );

const Head = ( { title, isTitleFormatted, description, canonicalUrl, children } ) => (
	<div>
		<Helmet
			title={ isTitleFormatted ? title : buildTitle( title ) }
			meta={ [
				description ? { name: 'description', property: 'og:description', content: description } : {},
				title ? { property: 'og:title', content: title } : {},
				canonicalUrl ? { property: 'og:url', content: canonicalUrl } : {},
			] }
			link={ [
				canonicalUrl ? { rel: 'canonical', href: canonicalUrl } : {}
			] }
			onChangeClientState={ debug }
		/>
		{ children }
	</div>
);

Head.displayName = 'Head';
Head.propTypes = {
	title: React.PropTypes.string,
	isTitleFormatted: React.PropTypes.bool,
	description: React.PropTypes.string,
	canonicalUrl: React.PropTypes.string,
	children: React.PropTypes.node,
};

// TODO: use `lib/screen-title/utils`, which currently depends on sites-list
// and isn't server-ready
function buildTitle( title ) {
	return title
		? decodeEntities( title ) + ' — WordPress.com'
		: 'WordPress.com';
}

export default Head;
