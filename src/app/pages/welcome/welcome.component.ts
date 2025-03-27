import { Component } from '@angular/core';
import { LoadingDirective } from '../../loading.directive';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports:[LoadingDirective]
})
export class WelcomeComponent {
  constructor() {}
  loadingState = {
    isLoading: true,
    data: [1,2,3]
  };
}
