import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class JobListingComponent {
  jobListingForm: FormGroup;
  fetchedJobListing: any = null;

  constructor(private fb: FormBuilder) {
    this.jobListingForm = this.fb.group({
      jobTitle: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      jobType: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.jobListingForm.valid) {
      console.log('Form Submitted', this.jobListingForm.value);
      localStorage.setItem('jobListingData', JSON.stringify(this.jobListingForm.value));

      // Reset the form after submission to prepare for new data
      this.jobListingForm.reset();  // This will clear all form fields
    } else {
      console.error('Form Invalid');
    }
  }

  // This method fetches job listing data from localStorage
  fetchData() {
    const jobListingData = localStorage.getItem('jobListingData');  // Retrieve the job listing data from localStorage
    if (jobListingData) {
      this.fetchedJobListing = JSON.parse(jobListingData);  // Parse and assign the data to fetchedJobListing
    } else {
      console.log('No job listing data found in localStorage');
    }
  }
}

