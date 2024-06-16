
/*
 * Page | Home
 */

import gsap from 'gsap'; 
import { IRouteHandler } from "../engine/routeDispatcher";


export class HomePage implements IRouteHandler {

  constructor() {
  }
  
  setup() {
        
  }

  exec() {

    console.log("Home."); 

  }

}
