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

import React from 'react'
import { values as valuesDecorator } from 'redux-form'

/*
 * Used to debug the content of a JSON document, particularly within a form
 * Usage
 *   <JsonDebug form={this.props.form}/>
 */
const JsonDebug = ({force,form,value}) => {
  if(form) {
    const decorator = valuesDecorator({ form })
    const component = ({ values }) =>
      (
          <pre style={{'marginTop': '1em','marginBottom': '1em'}}>{JSON.stringify(values,null,2)}</pre>
      )
    const Decorated = decorator(component)
    return <Decorated/>
  } else {
      return (
          <pre style={{'marginTop': '1em','marginBottom': '1em'}}>{JSON.stringify(value,null,2)}</pre>
      )
  }
}

export default JsonDebug