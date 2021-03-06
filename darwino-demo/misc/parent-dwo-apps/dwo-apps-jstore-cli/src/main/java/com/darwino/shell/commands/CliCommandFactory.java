/*!COPYRIGHT HEADER! - CONFIDENTIAL 
 *
 * Darwino Inc Confidential.
 *
 * (c) Copyright Darwino Inc. 2014-2016.
 *
 * Notice: The information contained in the source code for these files is the property 
 * of Darwino Inc. which, with its licensors, if any, owns all the intellectual property 
 * rights, including all copyright rights thereto.  Such information may only be used 
 * for debugging, troubleshooting and informational purposes.  All other uses of this information, 
 * including any production or commercial uses, are prohibited. 
 */

package com.darwino.shell.commands;

import com.darwino.command.impl.CommandFactoryImpl;

/**
 * CLI command factory.
 */
public class CliCommandFactory extends CommandFactoryImpl {

	public static CliCommandFactory instance = new CliCommandFactory();
	
	private CliCommandFactory() {
		super("CLI commands");
		putCommand(new LoadConfigCommand());
	}
}