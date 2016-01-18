/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import Gridicon from 'components/gridicon';

const ReaderSidebarTagListItem = React.createClass( {

	propTypes: {
		tag: React.PropTypes.object.isRequired,
		onUnfollow: React.PropTypes.func.isRequired
	},

	render() {
		const tag = this.props.tag;

		return (
			<li key={ tag.ID } >
				<a className="sidebar__menu-item-label" href={ tag.URL }>
					{ tag.title || tag.slug }
				</a>
				{ tag.ID !== 'pending' ? <button className="sidebar__menu-action" data-tag-slug={ tag.slug } onClick={ this.props.onUnfollow }>
					<Gridicon icon="cross-small" />
					<span className="sidebar__menu-action-label">{ this.translate( 'Unfollow' ) }</span>
				</button> : null }
			</li>
		);
	}
} );

export default ReaderSidebarTagListItem;

