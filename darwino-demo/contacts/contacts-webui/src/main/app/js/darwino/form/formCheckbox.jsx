/*!COPYRIGHT HEADER! - CONFIDENTIAL 
 *
 * Darwino Inc Confidential.
 *
 * (c) Copyright Darwino Inc. 2014-2017.
 *
 * Notice: The information contained in the source code for these files is the property 
 * of Darwino Inc. which, with its licensors, if any, owns all the intellectual property 
 * rights, including all copyright rights thereto.  Such information may only be used 
 * for debugging, troubleshooting and informational purposes.  All other uses of this information, 
 * including any production or commercial uses, are prohibited. 
 */

import React from "react";
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export const renderCheckbox = field => {
    return (
    <div className='checkbox'>
        <label>
            <input type='checkbox' {...field.input} disabled={field.disabled}/>
            {field.label}
        </label>
        {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
    </div>
)};
