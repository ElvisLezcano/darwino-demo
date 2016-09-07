/*!COPYRIGHT HEADER! 
 *
 * (c) Copyright Darwino Inc. 2014-2016.
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

package com.darwino.demo.dominodisc.app;
/*!COPYRIGHT HEADER! - CONFIDENTIAL 
 *
 * Darwino Inc Confidential.
 *
 * (c) Copyright Darwino Inc 2014-2015.
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.     
 */

import ios.NSObject;
import ios.foundation.NSDictionary;
import ios.uikit.UIApplication;
import ios.uikit.UIColor;
import ios.uikit.UINavigationController;
import ios.uikit.UIScreen;
import ios.uikit.UIWindow;
import ios.uikit.c.UIKit;
import ios.uikit.protocol.UIApplicationDelegate;

import org.moe.natj.general.Pointer;
import org.moe.natj.general.ann.RegisterOnStartup;
import org.moe.natj.objc.ann.Selector;

import com.darwino.commons.Platform;
import com.darwino.sqlite.IOSInstall;

@RegisterOnStartup
public class IOSMainClass extends NSObject implements UIApplicationDelegate {

	public static void main(String[] args) {
    	UIKit.UIApplicationMain(0, null, null, IOSMainClass.class.getName());
    }
    
	@Selector("alloc")
    public static native IOSMainClass alloc();

    protected IOSMainClass(Pointer peer) {
        super(peer);
    }
	
    private UIWindow window = null;
    
    @Override
    public boolean applicationDidFinishLaunchingWithOptions(UIApplication application, NSDictionary<?, ?> launchOptions) {
    	Platform.setDevelopment(true);
    	try {
        	IOSInstall.init();
        } catch(Throwable t) {
        	t.printStackTrace();
        }
    	
		try {
	        AppHybridApplication.create();
		} catch(Throwable t) {
			Platform.log(t);
			return false;
		}

        window = UIWindow.alloc().initWithFrame(UIScreen.mainScreen().bounds());
        window.setBackgroundColor(UIColor.lightGrayColor());
        
        // TODO Strong ref?
        UINavigationController navigationController = UINavigationController.alloc().initWithRootViewController(MainViewController.alloc().init());
        window.setRootViewController(navigationController);
        window.makeKeyAndVisible();

        return true;
    }
}