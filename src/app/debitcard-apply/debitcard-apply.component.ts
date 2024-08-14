import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-debitcard-apply',
  templateUrl: './debitcard-apply.component.html',
  styleUrls: ['./debitcard-apply.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DebitcardApplyComponent {

  // embeddedComponentUrl!: SafeResourceUrl;

  // constructor(private sanitizer: DomSanitizer) {
  //   // Generate a safe URL for the embedded component's route
  //   this.embeddedComponentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/embedded');
  // }

}
