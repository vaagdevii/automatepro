import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {

  selectedResume!: File;

  candidateData = {
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverNote: ''
  };

  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private candidateService: CandidateService) {}

  onFileSelected(event: any) {
    this.selectedResume = event.target.files[0];
  }

  submitApplication() {

    if (!this.selectedResume) {
      this.errorMessage = 'Please upload a resume.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();

    formData.append('fullName', this.candidateData.fullName);
    formData.append('email', this.candidateData.email);
    formData.append('phone', this.candidateData.phone);
    formData.append('position', this.candidateData.position);
    formData.append('coverNote', this.candidateData.coverNote);

    formData.append('resume', this.selectedResume);

    this.candidateService.createCandidate(formData).subscribe({
      next: () => {

        this.successMessage =
          'Application submitted successfully!';

        this.isSubmitting = false;

        this.candidateData = {
          fullName: '',
          email: '',
          phone: '',
          position: '',
          coverNote: ''
        };

      },
      error: (error) => {
        console.error(error);

        this.errorMessage =
          'Application submission failed.';

        this.isSubmitting = false;
      }
    });
  }
}