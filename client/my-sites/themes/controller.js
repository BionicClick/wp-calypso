/**
 * External Dependencies
 */
var ReactDom = require( 'react-dom' ),
	React = require( 'react' ),
	ReduxProvider = require( 'react-redux' ).Provider,
	titlecase = require( 'to-title-case' );

/**
 * Internal Dependencies
 */
var ThemesComponent = require( 'my-sites/themes/main' ),
	Head = require( 'layout/head' ),
	analytics = require( 'analytics' ),
	route = require( 'lib/route' ),
	i18n = require( 'lib/mixins/i18n' ),
	trackScrollPage = require( 'lib/track-scroll-page' ),
	sites = require( 'lib/sites-list' )(),
	titleActions = require( 'lib/screen-title/actions' ),
	buildTitle = require( 'lib/screen-title/utils' );

var controller = {

	themes: function( context ) {
		const { tier, site_id } = context.params;
		const title = buildTitle(
			i18n.translate( 'Themes', { textOnly: true } ),
			{ siteID: context.params.site_id } );

		let basePath = route.sectionify( context.path );
		let analyticsPageTitle = 'Themes';

		if ( site_id ) {
			basePath = basePath + '/:site_id';
			analyticsPageTitle += ' > Single Site';
		}

		if ( tier ) {
			analyticsPageTitle += ` > Type > ${titlecase( tier )}`;
		}

		analytics.pageView.record( basePath, analyticsPageTitle );

		ReactDom.render(
			React.createElement( ReduxProvider, { store: context.store },
				React.createElement( Head,
					{
						title,
						isTitleFormatted: true,
					},
					React.createElement( ThemesComponent, {
						key: site_id,
						siteId: site_id,
						sites: sites,
						tier: tier,
						search: context.query.s,
						trackScrollPage: trackScrollPage.bind(
							null,
							basePath,
							analyticsPageTitle,
							'Themes'
						)
					} )
				)
			),
			document.getElementById( 'primary' )
		);
	}
};

module.exports = controller;
