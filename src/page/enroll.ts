
/*
 * Page | Enroll
 */

import gsap from 'gsap'; 
import { IRouteHandler } from "../engine/routeDispatcher";
import { loadCSS } from '../engine/core';


export class EnrollPage implements IRouteHandler {

//  private apiKey: string = '7f3ae77e18be4b6ab41486af8fe348b9';
  private emailField: HTMLInputElement;
  private phoneField: HTMLInputElement;
  private emailValidationMessage: HTMLDivElement; 
  private phoneValidationMessage: HTMLDivElement; 
  private form: HTMLFormElement; 

  constructor() { 
//        this.apiKey = ''; //  apiKey;
  }
  
  setup() {
        
    // BUG: 
    loadCSS('http://127.0.0.1:3000/dist/css/enroll.css')

  }

  exec() {

    this.form = document.getElementById('enroll-form') as HTMLFormElement;
    this.form.addEventListener('submit', (event) => this.handleSubmit(event)); 

    // Email validation setup 
    this.emailField = document.getElementById('enroll-form-email') as HTMLInputElement;
    this.emailValidationMessage = document.getElementById('email-validation-message') as HTMLDivElement;
    this.emailField.addEventListener('blur', () => this.validateEmail());

    // Phone validation setup 
    this.phoneField = document.getElementById('enroll-form-phone') as HTMLInputElement;
    this.phoneValidationMessage = document.getElementById('phone-validation-message') as HTMLDivElement;
    this.phoneField.addEventListener('blur', () => this.validatePhone());

  }

  async validateEmail(): Promise<boolean> {
    const email = this.emailField.value;

    if (!email) {
        this.showEmailValidationMessage('Email field cannot be empty.', 'error');
        return false; 
    }

    const url = `https://www.mentodesign.academy/.api/validate/email?email=${encodeURIComponent(email)}`;

    try { 
        const response = await fetch(url);
        const data = await response.json();

        console.log(response); 

        if (data.status === 'valid') {
            this.showEmailValidationMessage('Email is valid.', 'success');
            return true; 
          } else {
            this.showEmailValidationMessage(`Email validation failed: ${data.sub_status || data.status}`, 'error');
            return false; 
          }
    } catch (error) {
        this.showEmailValidationMessage('Error validating email.', 'error');
        return false; 
    }
  }

  async validatePhone(): Promise<boolean> {
    const phone = this.phoneField.value;

    if (!phone) {
        this.showPhoneValidationMessage('Phone number field cannot be empty.', 'error');
        return false; 
    }

    const url = `https://www.mentodesign.academy/.api/validate/phone?phone=${encodeURIComponent(phone)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
console.log(data); 
        if (data.status === 'success' && data?.data.status === 'valid') {
            this.showPhoneValidationMessage('Phone number is valid.', 'success'); 
            return true; 
          } else {
            this.showPhoneValidationMessage(`Phone number validation failed: ${data.sub_status || data.status}`, 'error');
            return false; 
          }
    } catch (error) {
        this.showPhoneValidationMessage('Error validating phone number.', 'error');
        return false; 
    }
  }

  private showEmailValidationMessage(message: string, type: 'success' | 'error'): void {
    this.emailValidationMessage.textContent = message;
    this.emailValidationMessage.className = type;
    this.emailValidationMessage.style.display = 'block';
  }

  private showPhoneValidationMessage(message: string, type: 'success' | 'error'): void {
    this.phoneValidationMessage.textContent = message;
    this.phoneValidationMessage.className = type;
    this.phoneValidationMessage.style.display = 'block';
  } 

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const emailValid = await this.validateEmail();
    const phoneValid = await this.validatePhone();

    if (emailValid && phoneValid) {
        this.form.submit();
    } else {
        console.log('Form validation failed.');
    }
  }

}
