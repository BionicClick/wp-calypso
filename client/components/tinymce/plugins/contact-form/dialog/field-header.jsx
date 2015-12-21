/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

export default React.createClass( {
	displayName: 'ContactFormDialogFieldHeader',

	propTypes: {
		name: PropTypes.string.isRequired
	},

	render() {
		return (
			<div><div>{ this.props.name }</div><div><small>required textbox with placeholder text</small></div></div>
		);
	}
} );
