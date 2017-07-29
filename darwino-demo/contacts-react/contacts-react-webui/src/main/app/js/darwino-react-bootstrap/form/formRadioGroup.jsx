/*!COPYRIGHT HEADER! 
 *
 * (c) Copyright Darwino Inc. 2014-2017.
 *
 * Licensed under The MIT License (https://opensource.org/licenses/MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from "react";
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { renderText } from "./formText.jsx"

export const renderRadioGroup = field => {
    if(field.readOnly) return renderText(field);

    const { input, meta, options, disabled, label, inline } = field;
    if(inline) {
        return (
            <FormGroup className={meta.touched && meta.error ? 'has-error' : ''}>
                {label && <ControlLabel>{label}</ControlLabel>}
                <div className="radio">
                    {options && options.map(val => {
                        if(!(typeof(val)==="object")) val = {value:val,label:val};
                        return (
                            <label className="radio-inline" key={val.value}>
                                <input type="radio" {...input} value={val.value} checked={input.value==val.value} disabled={disabled}/>
                                {val.label||val.value}
                            </label>
                        )
                    })}
                </div>
                {meta.touched && meta.error && <div className="error">{meta.error}</div>}
            </FormGroup>
        )
    } else {
        return (
            <FormGroup className={meta.touched && meta.error ? 'has-error' : ''}>
                {label && <ControlLabel>{label}</ControlLabel>}
                {options && options.map(val => {
                    if(!(typeof(val)==="object")) val = {value:val,label:val};
                    return (
                        <div className="radio">
                            <label key={val.value}>
                                <input type="radio" {...input} value={val.value} checked={input.value==val.value} disabled={disabled}/>
                                {val.label||val.value}
                            </label>
                        </div>
                    )
                })}
                {meta.touched && meta.error && <div className="error">{meta.error}</div>}
            </FormGroup>
        )
    }
}
