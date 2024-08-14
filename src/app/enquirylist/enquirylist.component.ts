import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquirylist',
  templateUrl: './enquirylist.component.html',
  styleUrls: ['./enquirylist.component.css']
})
export class EnquirylistComponent implements OnInit{

  enquiries: any[] = [];
  pagedApplicants: any[] = [];
  page = 1;

  constructor() { }

  ngOnInit(): void {
    const enquiryListJSON = localStorage.getItem('enquiryList');
    if (enquiryListJSON) {
      this.enquiries = JSON.parse(enquiryListJSON);
    }

    // Initialize the paginated data
    this.pagedApplicants = this.enquiries.slice(0, 4);
  }

   // pagination function
   onPageChange(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    this.pagedApplicants = this.enquiries.slice(startIndex, endIndex);
  }


}
