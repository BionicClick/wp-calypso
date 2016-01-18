/** @ssr-ready **/

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import MasterbarLoggedOut from 'layout/masterbar/logged-out';
import ThemesHead from 'my-sites/themes/head';

const LayoutLoggedOutDesign = ( { tier = 'all' } ) => (
	<div className="wp is-section-design has-no-sidebar">
		<ThemesHead tier={ tier } />
		<MasterbarLoggedOut />
		<div id="content" className="wp-content">
			<div id="primary" className="wp-primary wp-section" />
			<div id="secondary" className="wp-secondary" />
		</div>
		<div id="tertiary" className="wp-overlay fade-background" />
	</div>
)

LayoutLoggedOutDesign.displayName = 'LayoutLoggedOutDesign';
LayoutLoggedOutDesign.propTypes = {
	tier: React.PropTypes.string
}

export default LayoutLoggedOutDesign;
