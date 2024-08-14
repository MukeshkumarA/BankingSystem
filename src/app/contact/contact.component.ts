import { Component } from '@angular/core';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactForm: FormGroup;

  faCoffee = solidIcons.faCoffee;
  faYoutube = brandIcons.faYoutube;
  faTwitter = brandIcons.faTwitter;
  faInstagram = brandIcons.faInstagram;
  faFacebook = brandIcons.faFacebook;
  faLinkedin = brandIcons.faLinkedin;
  faEnvelope = regularIcons.faEnvelope;
  faLocationDot = solidIcons.faLocationDot;
  faPhone = solidIcons.faPhone;
  faCheckCircle = solidIcons.faCheckCircle;
  faPlusCircle = solidIcons.faPlusCircle;

  constructor(private fb: FormBuilder) { 
    this.contactForm = this.fb.group({
      
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // document.addEventListener('click', this.onDocumentClick.bind(this));

    // Initialize "enquiryList" in local storage if not already present
    const existingEnquiriesString = localStorage.getItem('enquiryList');
    if (!existingEnquiriesString) {
      localStorage.setItem('enquiryList', JSON.stringify([]));
    } 

  }


  
  // contact form
  submitForm() {
    if (this.contactForm.valid) {
      // Save values to local storage
      const enquiry = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        description: this.contactForm.value.description
      };
  
      // Retrieve existing list from local storage or initialize an empty array
      const existingEnquiriesString = localStorage.getItem('enquiryList');
      let existingEnquiries = [];
  
      if (existingEnquiriesString) {
        existingEnquiries = JSON.parse(existingEnquiriesString);
      }
  
      // Add the new enquiry to the list
      existingEnquiries.push(enquiry);
  
      // Store the updated list back in local storage
      localStorage.setItem('enquiryList', JSON.stringify(existingEnquiries));
  
      // Reset form values after submission
      this.contactForm.reset();
    }
  }
  
}
