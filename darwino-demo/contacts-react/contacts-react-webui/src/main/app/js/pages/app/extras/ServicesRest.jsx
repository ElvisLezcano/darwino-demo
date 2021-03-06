/* 
 * (c) Copyright Darwino Inc. 2014-2017.
 */
import React, {Component} from "react";
import { Button, ButtonToolbar, ControlLabel } from 'react-bootstrap';

import { MicroServices, fetchJson } from '@darwino/darwino';

import { Messages } from '@darwino/darwino-react-bootstrap';

class ServicesRest extends Component {

    constructor(props,context) {
        super(props,context)
        this.state = {
            error: false,
            result: null
        }
    }

    callRestService(valid) {
        const {mainForm} = this.props;
        let url = `$darwino-app/`
        if(!valid) url += 'fake'
        return fetchJson(url)
        .then((r) => {
            this.setState({
                error: false,
                result: JSON.stringify(r,null,2)
            })
        })
        .catch((e) => {
            this.setState({
                error: true,
                result: e.message+"\n"+e.content
            })
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-12 col-sm-12">
                    <p>
                       The code bellow shows how to connect to generic REST services implemented on
                        the server side.
                    </p>
                </div>
                <div className="col-md-12 col-sm-12">
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={()=>this.callRestService(true)}>Call REST service</Button>
                        <Button bsStyle="primary" onClick={()=>this.callRestService(false)}>Call REST service - Error</Button>
                    </ButtonToolbar>
                    <br/>
                    {this.state.result &&
                        <pre style={this.state.error ? {color: 'red'} : {} }>
                            {this.state.result}
                        </pre>
                    }
                </div>
            </div>
        );
    }
}

export default ServicesRest