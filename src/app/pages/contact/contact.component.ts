import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  errors: any = {};
  contactForm = { email: '', phone: '', name: '', message: '' };
  consent: boolean = false;


  /********** PUBLIC **********/
  public onSubmit() {
    this.resetErrors();
    this.validateForm();

    if (Object.keys(this.errors).length == 0) {
      console.log(this.contactForm);
    }
  }


  /********** PRIVATE **********/
  private resetErrors() {
    this.errors = {};
  }

  private validateForm() {
    if (!this.consent) this.errors.consent = 'You must accept the privacy policy';
    if (!this.contactForm.email) {
      this.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactForm.email)) {
      this.errors.email = 'Email format is invalid';
    }

    if (!this.contactForm.phone) {
      this.errors.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s\-()]{7,}$/.test(this.contactForm.phone)) {
      this.errors.phone = 'Phone format is invalid';
    }

    if (!this.contactForm.name) this.errors.name = 'Name is required';
    if (!this.contactForm.message) this.errors.message = 'Message is required';
  }
}