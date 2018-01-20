/* 
 * (c) Copyright Darwino Inc. 2014-2017.
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';

import ons from 'onsenui';
import {
    Toolbar,
    ToolbarButton,
    Icon,
    BackButton
} from 'react-onsenui';
  
class NavBar extends Component {

    // Context to read from the parent - navigator
    static contextTypes = {
        navigator: PropTypes.object
    };

    constructor(props,context) {
        super(props,context);
    }

    renderAction(action) {
        if(action.type=="save") {
            if(ons.platform.isAndroid()) {
                return <ToolbarButton className='right' onClick={action.handler}><Icon icon='md-save'/></ToolbarButton>
            }
            return <ToolbarButton className='right' onClick={action.handler}>Save</ToolbarButton>
        }
        if(action.type=="new") {
            if(ons.platform.isAndroid()) {
                // Use a floating button?
                return null;
            }
            return <ToolbarButton className='right' onClick={action.handler}>New</ToolbarButton>
        }
        return null;
    }

    render() {
        const {title, backButton, action} = this.props;
        return (
            <Toolbar>
                <div className='left'>
                    {backButton ? <BackButton onClick={() => this.context.navigator.popPage()}>Back</BackButton> : null}
                </div>
                <div className='center'>{title}</div>
                {action && this.renderAction(action)}
            </Toolbar>
        )
    }
}

export default NavBar;