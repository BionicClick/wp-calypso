/**
 * External Dependencies
 */
import tinymce from 'tinymce/tinymce';
import i18n from 'lib/mixins/i18n';
import React, { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
/**
 * Internal Dependencies
 */
import Gridicon from 'components/gridicon';
import ContactFormDialog from './dialog';
import reducer from './state/reducer';
import { initContactForm, addDefaultField, removeField } from './state/actions';
import { serialize, deserialize } from './shortcode-utils';

const wpcomContactForm = editor => {
	let node;
	let store = createStore( reducer );

	editor.on( 'init', () => {
		node = editor.getContainer().appendChild(
			document.createElement( 'div' )
		);
	} );

	editor.on( 'remove', () => {
		unmountComponentAtNode( node );
		node.parentNode.removeChild( node );
		node = null;
	} );

	editor.addCommand( 'wpcomContactForm', content => {
		store.dispatch( initContactForm( deserialize( content ) ) );

		function onClose() {
			editor.focus();
			renderModal( 'hide' );
		};

		function renderModal( visibility = 'show' ) {
			render(
				createElement( Provider, { store },
					createElement( ContactFormDialog, {
						showDialog: visibility === 'show',
						onAdd() {
							store.dispatch( addDefaultField() )
						},
						onRemove( index ) {
							store.dispatch( removeField( index ) );
						},
						onClose,
						onSave() {
							//get contact form from state to save
							editor.execCommand( 'mceInsertContent', false, serialize( store.getState() ) );
						}
					} )
				),
				node
			);
		};

		renderModal();
	} );

	editor.addButton( 'wpcom_add_contact_form', {
		classes: 'btn wpcom-button contact-form',
		title: i18n.translate( 'Add Contact Form' ),
		cmd: 'wpcomContactForm',
		onPostRender() {
			this.innerHtml( renderToStaticMarkup(
				<button type="button" role="presentation">
					<Gridicon icon="grid" size={ 18 } />
				</button>
			) );
		}
	} );
};

export default () => {
	tinymce.PluginManager.add( 'wpcom/contactform', wpcomContactForm );
}
