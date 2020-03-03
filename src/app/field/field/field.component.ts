import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  items: Item[];

  constructor() { }

  ngOnInit(): void {
    this.items = new Array();
    this.buildNewField();
  }

  private buildNewField():void{
    const randomPhraseList = this.getRandomPhraseList();
    for(var i = 0; i < 25; i++){
      const current = new Item();
      current.id = i;
      current.text = randomPhraseList[i];
      current.isSelected = false;
      this.items.push(current);
    }
  }

  private getRandomPhraseList():string[] {
    const phrases = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const randomList = new Array();

    for(var i = 0; i < 25; i++){
      var randomNumber = Math.floor(Math.random() * Math.floor(phrases.length));
      while(randomList.includes(phrases[randomNumber])){
        console.log(phrases[randomNumber] + ' already in list, getting new random number...');
        randomNumber = Math.floor(Math.random() * Math.floor(phrases.length));
      }
      randomList.push(phrases[randomNumber]);
    }
    return randomList;
  }

}
