import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input()
  id;

  @Input()
  text;

  isSelected = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  select():void {
    this.isSelected = !this.isSelected;

    let element = document.getElementById(this.id);
    if(this.isSelected){
      element.className = 'single-item selected';
    }
    else{
      element.className = 'single-item';
    }
  }

}
