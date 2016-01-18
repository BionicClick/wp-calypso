/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import partialRight from 'lodash/function/partialRight';
import page from 'page';

/**
 * Internal dependencies
 */
import Helper from 'lib/themes/helpers';
import ThemesSearchCard from './themes-search-card';
import ThemesData from 'components/data/themes-list-fetcher';
import ThemesList from 'components/themes-list';
import StickyPanel from 'components/sticky-panel';
import analytics from 'analytics';
import buildUrl from 'lib/mixins/url-search/build-url';
import urlSearch from 'lib/mixins/url-search';
import config from 'config';

const ThemesSelection = React.createClass( {
	mixins: [ urlSearch ],

	propTypes: {
		selectedSite: PropTypes.object,
		siteId: PropTypes.string,
		search: PropTypes.string,
		onScreenshotClick: PropTypes.func.isRequired,
		options: React.PropTypes.objectOf( {
			label: React.PropTypes.string,
			header: React.PropTypes.string,
			action: React.PropTypes.func,
			getUrl: React.PropTypes.func,
			hideForTheme: React.PropTypes.func
		} ),
		queryParams: PropTypes.object.isRequired,
		themesList: PropTypes.array.isRequired
	},

	getInitialState: function() {
		return {
			tier: this.props.tier || config.isEnabled( 'premium-themes' ) ? 'all' : 'free'
		};
	},

	onMoreButtonClick( theme, resultsRank ) {
		this.recordSearchResultsClick( theme, resultsRank );
	},

	recordSearchResultsClick( theme, resultsRank ) {
		const { queryParams, themesList } = this.props;
		analytics.tracks.recordEvent( 'calypso_themeshowcase_theme_click', {
			search_term: queryParams.search,
			theme: theme,
			results_rank: resultsRank + 1,
			results: themesList,
			page_number: queryParams.page
		} );
	},

	trackScrollPage() {
		analytics.tracks.recordEvent( 'calypso_themeshowcase_scroll' );
		this.props.trackScrollPage();
	},

	trackLastPage() {
		analytics.ga.recordEvent( 'Themes', 'Reached Last Page' );
		analytics.tracks.recordEvent( 'calypso_themeshowcase_last_page_scroll' );
	},

	onTierSelect( { value: tier } ) {
		const siteId = this.props.siteId ? `/${this.props.siteId}` : '';
		const url = `/design/type/${tier}${siteId}`;
		this.setState( { tier } );
		Helper.trackClick( 'search bar filter', tier );
		page( buildUrl( url, this.props.search ) );
	},

	onScreenshotClick( theme, resultsRank ) {
		Helper.trackClick( 'theme', 'screenshot' );
		if ( ! theme.active ) {
			this.recordSearchResultsClick( theme, resultsRank );
		}
		this.props.onScreenshotClick( theme );
	},

	render() {
		const site = this.props.selectedSite;

		return (
			<div className="themes__selection">
				<StickyPanel>
					<ThemesSearchCard
							site={ site }
							onSearch={ this.doSearch }
							search={ this.props.search }
							tier={ this.state.tier }
							select={ this.onTierSelect } />
				</StickyPanel>
				<ThemesData
						site={ site }
						isMultisite={ ! this.props.siteId } // Not the same as `! site` !
						search={ this.props.search }
						tier={ this.state.tier }
						onRealScroll={ this.trackScrollPage }
						onLastPage={ this.trackLastPage } >
					<ThemesList buttonOptions={ this.props.options }
						onMoreButtonClick={ this.onMoreButtonClick }
						onScreenshotClick={ this.onScreenshotClick }
						getScreenshotUrl={ site ? partialRight( Helper.getPreviewUrl, site ) : null } />
				</ThemesData>
			</div>
		);
	},

} );

export default ThemesSelection;
