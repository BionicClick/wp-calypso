/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import FieldHeader from './field-header';
import FoldableCard from 'components/foldable-card';
import FormFieldset from 'components/forms/form-fieldset';
import FormLegend from 'components/forms/form-legend';
import FormLabel from 'components/forms/form-label';
import FormTextInput from 'components/forms/form-text-input';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormButton from 'components/forms/form-button';
import FormCheckbox from 'components/forms/form-checkbox';
import SelectDropdown from 'components/select-dropdown';
import DropdownItem from 'components/select-dropdown/item';
import TokenField from 'components/token-field';
import TrackInputChanges from 'components/track-input-changes';


export default React.createClass( {
	displayName: 'ContactFormDialogField',

	propTypes: {
		type: PropTypes.string
	},

	getInitialState() {
		return {
			name: 'Name',
			type: 'name',
			tokens: [ 'first option', 'last option' ]
		}
	},

	render() {
		return (
			<FoldableCard
				header={ <FieldHeader name={ this.state.name } /> }
				summary={ <FormButton scary={ true }>Remove</FormButton> }
				expandedSummary={ <FormButton scary={ true }>Remove</FormButton> }
			>
				<FormFieldset>
					<FormLabel>Field Type</FormLabel>
					<SelectDropdown selectedText={ this.state.type }>
						<DropdownItem selected={ this.state.type === 'checkbox' } onClick={ () => this.setState( { type: 'checkbox' } ) }>Checkbox</DropdownItem>
						<DropdownItem selected={ this.state.type === 'dropdown' } onClick={ () => this.setState( { type: 'dropdown' } ) }>Dropdown</DropdownItem>
						<DropdownItem selected={ this.state.type === 'email' } onClick={ () => this.setState( { type: 'email' } ) }>Email</DropdownItem>
						<DropdownItem selected={ this.state.type === 'name' } onClick={ () => this.setState( { type: 'name' } ) }>Name</DropdownItem>
						<DropdownItem selected={ this.state.type === 'radio' } onClick={ () => this.setState( { type: 'radio' } ) }>Radio</DropdownItem>
						<DropdownItem selected={ this.state.type === 'text' } onClick={ () => this.setState( { type: 'text' } ) }>Text</DropdownItem>
						<DropdownItem selected={ this.state.type === 'textarea' } onClick={ () => this.setState( { type: 'textarea' } ) }>Text Area</DropdownItem>
						<DropdownItem selected={ this.state.type === 'website' } onClick={ () => this.setState( { type: 'website' } ) }>Website</DropdownItem>
					</SelectDropdown>
				</FormFieldset>
				<FormFieldset>
					<FormLabel>Field Name</FormLabel>
					<TrackInputChanges>
						<FormTextInput value={ this.state.name } onChange={ event => this.setState( { name: event.target.value } ) } />
					</TrackInputChanges>
					<FormSettingExplanation>Name of the field as it will appear when you receive an email.</FormSettingExplanation>
				</FormFieldset>

				{ () => {
					if ( this.state.type !== 'radio' && this.state.type !== 'dropdown' ) {
						return (
							<FormFieldset>
								<FormLabel>Placeholder Text</FormLabel>
								<FormTextInput />
								<FormSettingExplanation>A placeholder text that will appear inside this form field as a reference to the user.</FormSettingExplanation>
							</FormFieldset>
						);
					}
				}() }

				{ () => {
					if ( this.state.type === 'radio' || this.state.type === 'dropdown' ) {
						return (
							<FormFieldset>
								<FormLabel>Options</FormLabel>
								<TokenField
									value={ this.state.tokens }
									onChange={ tokens => this.setState( { tokens } ) }/>
							</FormFieldset>
						);
					}
				}() }

				<FormFieldset>
					<FormLegend>Required</FormLegend>
					<FormLabel>
						<FormCheckbox />
						{ this.translate( 'This field is required' ) }
					</FormLabel>
				</FormFieldset>
			</FoldableCard>

		);
	}
} );
