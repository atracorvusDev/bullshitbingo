import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../item';
import { FieldService } from '../field.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(public fieldService:FieldService) {
  }

  ngOnInit(): void {
  }

  isBingo():boolean{
    return this.fieldService.isBingo();
  }

  updateItems(updated:Item):void {
    //Service updaten
  }

}
