import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContactForm } from '../../../models/ContactForm';
import { EmailService } from '../../../services/email/email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  errors: any = {};
  contactForm: ContactForm = { name: '', phone: '', email: '', message: '' };
  consent: boolean = false;
  isSubmitting: boolean = false;

  constructor(private emailService: EmailService) { }


  /********** PUBLIC **********/
  public onSubmit() {
    this.resetErrors();
    this.validateForm();

    if (Object.keys(this.errors).length == 0) {
      this.isSubmitting = true;

      this.emailService.sendEmail(this.contactForm).subscribe({
        next: res => {
          alert('Your message has been sent successfully.');
          this.resetForm();
        },
        error: err => {
          alert('There was an error sending your message. Please try again later.');
          console.log(err.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }


  /********** PRIVATE **********/
  private resetErrors() {
    this.errors = {};
  }

  private resetForm() {
    this.contactForm = { name: '', phone: '', email: '', message: '' };
    this.consent = false;
  }

  private validateForm() {
    if (!this.consent) this.errors.consent = 'You must accept the privacy policy';

    if (!this.contactForm.name) this.errors.name = 'Name is required';

    if (!this.contactForm.phone) {
      this.errors.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s\-()]{7,}$/.test(this.contactForm.phone)) {
      this.errors.phone = 'Phone format is invalid';
    }

    if (!this.contactForm.email) {
      this.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactForm.email)) {
      this.errors.email = 'Email format is invalid';
    }

    if (!this.contactForm.message) this.errors.message = 'Message is required';
  }
}