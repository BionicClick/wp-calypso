/**
 * External Dependencies
 */
import React from 'react';
import map from 'lodash/collection/map';

/**
 * Internal Dependencies
 */
import ReaderSidebarTagListItem from './list-item';

const ReaderSidebarTagList = React.createClass( {

	propTypes: {
		tags: React.PropTypes.array,
		onUnfollow: React.PropTypes.func.isRequired
	},

	renderItems() {
		return map( this.props.tags, function( tag ) {
			return (
				<ReaderSidebarTagListItem key={ tag.ID } tag={ tag } onUnfollow={ this.props.onUnfollow } />
			);
		}, this );
	},

	render: function() {
		if ( ! this.props.tags || this.props.tags.length === 0 ) {
			return (
				<li key="empty" className="sidebar__menu-empty">{ this.translate( 'Finds relevant posts by adding a\xa0tag.' ) }</li>
			);
		}

		return(
			<div>{ this.renderItems() }</div>
		);
	}
} );

export default ReaderSidebarTagList;
