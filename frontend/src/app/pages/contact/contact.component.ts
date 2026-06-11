import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  leadData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private leadService: LeadService) {}

  submitLead() {
    console.log('Submit button clicked', this.leadData);

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.leadService.createLead(this.leadData).subscribe({
      next: (response) => {
        console.log('Lead submitted successfully', response);

        this.successMessage = '✅ Inquiry submitted successfully!';
        this.errorMessage = '';
        this.isSubmitting = false;

        this.leadData = {
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          message: ''
        };
      },
      error: (error) => {
        console.error('Lead submission failed', error);

        this.errorMessage = '❌ Submission failed. Please check backend connection.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }
}