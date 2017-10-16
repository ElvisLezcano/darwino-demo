/* 
 * (c) Copyright Darwino Inc. 2014-2017.
 */

import React, { Component } from "react";
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Link, Prompt } from "react-router-dom";
import { FormattedDate, FormattedTime } from "react-intl";
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import {JsonDebug} from "@darwino/darwino-react";
import { renderText, renderRadioGroup, renderCheckbox, renderSelect, renderRichText, renderDatePicker } from '@darwino/darwino-react-bootstrap';
import { FormPage } from '@darwino/darwino-react-bootstrap-notes';

import Constants from "./../Constants";
import CCAddress from "./CCAddress";
import {checkUser} from "../Demo";


const DATABASE = Constants.DATABASE;
const STORE = "_default";

const FORM_NAME = "contact";

export class Contact extends FormPage {

    // Default values of the properties
    static defaultProps  = {
        databaseId: DATABASE,
        storeId: STORE
    };

    constructor(props,context) {
        super(props,context)
    }

    handleUpdateDocument(state, dispatch) {
        if(!checkUser(this)) {
            return;
        }
        super.handleUpdateDocument(state, dispatch);
    }

    // Default values when a new document is created
    defaultValues(values) {
        values.form = "Contact"
        values.firstname = "Leonardo"
        values.lastname = "da Vinci"
    }

    // Validation
    validate(values) {
        const errors = {};
        // Add the validation rules here!
        if(!values.firstname) {
            errors.firstname = "Missing First Name"
        }
        if(!values.lastname) {
            errors.lastname = "Missing Last Name"
        }
        return errors;
    }

    // Values computed once when the document is loaded
    calculateOnLoad(values) {
        values.title = "Contact Document"
    }

    // Values computed every time the document is changed
    calculateOnChange(values) {
        values.fullname = this.getFieldValue("firstname","") + " " + this.getFieldValue("lastname","")
        values.fullnameUpper = this.getFieldValue("fullname","").toUpperCase()
    }

    contributeActionBar() {
        const { newDoc, doc } = this.state;
        const { invalid, submitting } = this.props;
        return (
            <Nav key="main">
                <NavItem eventKey={1} href="#" onClick={this.submit}>Save</NavItem>
                <NavItem eventKey={2} href="#" onClick={this.cancel}>Cancel</NavItem>
                <NavDropdown eventKey={3} title="Form Actions" id="form-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action 1</MenuItem>
                    <MenuItem eventKey={3.2}>Action 2</MenuItem>
                    <MenuItem eventKey={3.3}>Action 3</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>Action 4</MenuItem>
                </NavDropdown>
            </Nav>
        );
    }

    render() {
        const { handleSubmit, dirty } = this.props;
        const readOnly = this.isReadOnly();
        const disabled = this.isDisabled();
        
        return (
            <div>
                {this.createMessages()}
                <form onSubmit={handleSubmit(this.handleUpdateDocument)}>
                    {this.createActionBar()}
                    <Prompt
                        when={dirty}
                        message={location => (
                            `The contact is modified and not saved yet.\nDo you want to leave the current page without saving it?`
                        )}
                    />                    
                    <fieldset>
                        <h2>{this.getFieldValue("title")}</h2>

                        <div className="col-md-12 col-sm-12">
                            <Field name="firstname" type="text" component={renderText} label="First Name" disabled={disabled} readOnly={readOnly}/>
                        </div>

                        <div className="col-md-12 col-sm-12">
                            <Field name="lastname" type="text" component={renderText} label="Last Name" disabled={disabled} readOnly={readOnly}/>
                        </div>

                        <div className="col-md-12 col-sm-12">
                            <Panel collapsible defaultExpanded header="Address">
                                <CCAddress {...this.props} name=""/>
                            </Panel>
                        </div>
                    </fieldset>
                    {/*Uncomment to display the current JSON content*/}
                    {/* <JsonDebug form={this.props.form}/>   */}
                </form>
            </div>
        );
  }
}

const form = reduxForm({
    form: FORM_NAME,
    validate: FormPage.validateForm,
    onChange: FormPage.onChange
});

export default withRouter(
    connect(null,FormPage.mapDispatchToProps)
        (form(Contact))
)
