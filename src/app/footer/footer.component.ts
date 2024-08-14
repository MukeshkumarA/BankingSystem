import { Component } from '@angular/core';
import { solidIcons, brandIcons, regularIcons } from '../icon-library';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faCoffee = solidIcons.faCoffee;
  faYoutube = brandIcons.faYoutube;
  faTwitter = brandIcons.faTwitter;
  faInstagram = brandIcons.faInstagram;
  faFacebook = brandIcons.faFacebook;
  faLinkedin = brandIcons.faLinkedin;
}
