import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../item';

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

  isSelected;

  @Output() 
  selectedEmitter:EventEmitter<Item> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    this.isSelected = false;
  }

  select():void {
    // update isSelected
    this.isSelected = !this.isSelected;

    // update UI
    let element = document.getElementById(this.id);
    if(this.isSelected){
      element.className = 'single-item selected';
    }
    else{
      element.className = 'single-item';
    }

    // update gameplay
    const updateItem = new Item();
    updateItem.id = this.id;
    updateItem.isSelected = this.isSelected;
    this.selectedEmitter.emit(updateItem);
  }

}
