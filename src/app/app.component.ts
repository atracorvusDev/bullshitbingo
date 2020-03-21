import { Component } from '@angular/core';
import { version } from '../../package.json';
import { FieldService } from './field/field.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bullshitbingo';
  public version: string = version;
  
  constructor(public fieldService:FieldService) {
  }
}