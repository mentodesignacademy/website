/*
 * SITE
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { HomePage } from "./page/home";
import { RouteDispatcher } from "./engine/routeDispatcher";
import { EnrollPage } from "./page/enroll";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {

        // Site pages
        '/': HomePage,

        // Test pages
        '/test/enroll': EnrollPage, 

    };

    return routeDispatcher;
}

