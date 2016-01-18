/**
 * External Dependencies
 */
import React from 'react';
import closest from 'component-closest';

/**
 * Internal Dependencies
 */
import ExpandableSidebarMenu from '../expandable';
import ReaderSidebarTagList from './list';
import TagStore from 'lib/reader-tags/subscriptions';
import TagActions from 'lib/reader-tags/actions';

const stats = require( 'reader/stats' );

const ReaderSidebarTagSection = React.createClass( {

	propTypes: {
		tags: React.PropTypes.array
	},

	followTag: function( tag ) {
		var subscription;
		subscription = TagStore.getSubscription( TagActions.slugify( tag ) );
		if ( subscription ) {
			this.highlightNewTag( subscription );
		} else {
			TagActions.follow( tag );
			stats.recordAction( 'followed_topic' );
			stats.recordGaEvent( 'Clicked Follow Topic', tag );
			stats.recordTrack( 'calypso_reader_reader_tag_followed', {
				tag: tag
			} );
		}
	},

	unfollowTag( event ) {
		var node = closest( event.target, '[data-tag-slug]', true );
		event.preventDefault();
		if ( node && node.dataset.tagSlug ) {
			stats.recordAction( 'unfollowed_topic' );
			stats.recordGaEvent( 'Clicked Unfollow Topic', node.dataset.tagSlug );
			stats.recordTrack( 'calypso_reader_reader_tag_unfollowed', {
				tag: node.dataset.tagSlug
			} );
			TagActions.unfollow( { slug: node.dataset.tagSlug } );
		}
	},

	render: function() {
		const tagCount = this.props.tags ? this.props.tags.length : 0;
		return (
			<ExpandableSidebarMenu
				expanded={ true }
				title={ this.translate( 'Tags' ) }
				count={ tagCount }
				addPlaceholder={ this.translate( 'Add any tag' ) }
				onAddSubmit={ this.followTag }>
					<ReaderSidebarTagList tags={ this.props.tags } onUnfollow={ this.unfollowTag } />
			</ExpandableSidebarMenu>
		);
	}
} );

export default ReaderSidebarTagSection;
