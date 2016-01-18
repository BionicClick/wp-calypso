/**
 * External dependencies
 */
var React = require( 'react' ),
	bindActionCreators = require( 'redux' ).bindActionCreators,
	connect = require( 'react-redux' ).connect;

/**
 * Internal dependencies
 */
var Main = require( 'components/main' ),
	CurrentThemeData = require( 'components/data/current-theme' ),
	ActivatingTheme = require( 'components/data/activating-theme' ),
	Action = require( 'lib/themes/actions' ),
	WebPreview = require( 'components/web-preview' ),
	Button = require( 'components/button' ),
	CurrentTheme = require( 'my-sites/themes/current-theme' ),
	SidebarNavigation = require( 'my-sites/sidebar-navigation' ),
	ThanksModal = require( 'my-sites/themes/thanks-modal' ),
	config = require( 'config' ),
	EmptyContent = require( 'components/empty-content' ),
	observe = require( 'lib/mixins/data-observe' ),
	JetpackUpgradeMessage = require( './jetpack-upgrade-message' ),
	JetpackManageDisabledMessage = require( './jetpack-manage-disabled-message' ),
	ThemesSiteSelectorModal = require( './themes-site-selector-modal' ),
	ThemesSelection = require( './themes-selection' ),
	ThemeHelpers = require( 'lib/themes/helpers' ),
	getButtonOptions = require( './theme-options' ).getButtonOptions,
	addTracking = require( './theme-options' ).addTracking,
	actionLabels = require( './action-labels' ),
	ThemesListSelectors = require( 'lib/themes/selectors/themes-list' ),
	user = require( 'lib/user' )();

var Themes = React.createClass( {
	mixins: [ observe( 'sites' ) ],

	propTypes: {
		siteId: React.PropTypes.string,
		sites: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			selectedTheme: null,
			selectedAction: null,
		};
	},

	renderCurrentTheme: function() {
		var site = this.props.sites.getSelectedSite();
		return (
			<CurrentThemeData site={ site }>
				<CurrentTheme
					site={ site }
					canCustomize={ site && site.isCustomizable() } />
			</CurrentThemeData>
		);
	},

	renderThankYou: function() {
		return (
			<ActivatingTheme siteId={ this.props.sites.getSelectedSite().ID } >
				<ThanksModal
					site={ this.props.sites.getSelectedSite() }
					clearActivated={ bindActionCreators( Action.clearActivated, this.props.dispatch ) } />
			</ActivatingTheme>
		);
	},

	setSelectedTheme: function( action, theme ) {
		this.setState( { selectedTheme: theme, selectedAction: action } );
	},

	togglePreview: function( theme ) {
		const site = this.props.sites.getSelectedSite();
		if ( site.jetpack ) {
			this.props.dispatch( Action.customize( theme, site ) );
		} else {
			const previewUrl = ThemeHelpers.getPreviewUrl( theme, site );
			this.setState( { showPreview: ! this.state.showPreview, previewUrl: previewUrl, previewingTheme: theme } );
		}
	},

	hideSiteSelectorModal: function() {
		this.setSelectedTheme( null, null );
	},

	isThemeOrActionSet: function() {
		return this.state.selectedTheme || this.state.selectedAction;
	},

	isMultisite: function() {
		return ! this.props.siteId; // Not the same as `! site` !
	},

	isLoggedOut: function() {
		return ! user.get();
	},

	renderJetpackMessage: function() {
		var site = this.props.sites.getSelectedSite();
		return (
			<EmptyContent title={ this.translate( 'Changing Themes?' ) }
				line={ this.translate( 'Use your site theme browser to manage themes.' ) }
				action={ this.translate( 'Open Site Theme Browser' ) }
				actionURL={ site.options.admin_url + 'themes.php' }
				actionTarget="_blank"
				illustration="/calypso/images/drake/drake-jetpack.svg" />
		);
	},

	render: function() {
		var site = this.props.sites.getSelectedSite(),
			isJetpack = site.jetpack,
			jetpackEnabled = config.isEnabled( 'manage/themes-jetpack' ),
			dispatch = this.props.dispatch,
			buttonOptions = getButtonOptions(
				site,
				this.isLoggedOut(),
				bindActionCreators( Action, dispatch ),
				this.setSelectedTheme,
				this.togglePreview
			),
			onScreenshotClick = function( theme ) {
				buttonOptions[ ( site && theme.active ) ? 'customize' : 'preview' ].action( theme );
			};

		if ( isJetpack && jetpackEnabled && ! site.hasJetpackThemes ) {
			return <JetpackUpgradeMessage site={ site } />;
		}

		if ( isJetpack && jetpackEnabled && ! site.canManage() ) {
			return <JetpackManageDisabledMessage site={ site } />;
		}

		const webPreviewButtonText = this.isLoggedOut()
			? this.translate( 'Choose this design', {
				comment: 'when signing up for a WordPress.com account with a selected theme'
			} )
			: this.translate( 'Try & Customize', {
				context: 'when previewing a theme demo, this button opens the Customizer with the previewed theme'
			} );

		return (
			<Main className="themes">
				<SidebarNavigation />
				{ this.state.showPreview &&
					<WebPreview showPreview={ this.state.showPreview }
						onClose={ this.togglePreview }
						previewUrl={ this.state.previewUrl } >
						<Button primary onClick={ this.setState.bind( this, { showPreview: false },
							() => {
								if ( this.isLoggedOut() ) {
									dispatch( Action.signup( this.state.previewingTheme ) );
								} else {
									buttonOptions.customize.action( this.state.previewingTheme );
								}
							} ) } >{ webPreviewButtonText }</Button>
					</WebPreview>
				}
				{ this.renderThankYou() }
				{ ! this.isMultisite() && this.renderCurrentTheme() }
				{ isJetpack && ! jetpackEnabled
				? this.renderJetpackMessage()
				: <ThemesSelection search={ this.props.search }
						key={ this.isMultisite() || site.ID }
						siteId={ this.props.siteId }
						selectedSite={ site }
						onScreenshotClick={ onScreenshotClick }
						options={ addTracking( buttonOptions ) }
						trackScrollPage={ this.props.trackScrollPage }
						tier={ this.props.tier }
						queryParams={ this.props.queryParams }
						themesList={ this.props.themesList } />
				}
				{ this.isThemeOrActionSet() && <ThemesSiteSelectorModal
					name={ this.state.selectedAction /* TODO: Can we get rid of this prop? */ }
					label={ actionLabels[ this.state.selectedAction ].label }
					header={ actionLabels[ this.state.selectedAction ].header }
					selectedTheme={ this.state.selectedTheme }
					onHide={ this.hideSiteSelectorModal }
					action={ bindActionCreators( Action[ this.state.selectedAction ], dispatch ) }
				/> }
			</Main>
		);
	}
} );

export default connect(
	( state, props ) => Object.assign( {},
		props,
		{
			queryParams: ThemesListSelectors.getQueryParams( state ),
			themesList: ThemesListSelectors.getThemesList( state )
		}
	)
)( Themes );
