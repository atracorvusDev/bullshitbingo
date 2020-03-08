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

  readonly idMap = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24]
  ];

  bingo = false;

  constructor() { }

  ngOnInit(): void {
    this.items = new Array();
    this.buildNewField();
  }

  isBingo():boolean{
    return this.bingo;
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
        randomNumber = Math.floor(Math.random() * Math.floor(phrases.length));
      }
      randomList.push(phrases[randomNumber]);
    }
    return randomList;
  }

  updateItems(updated:Item):void {
    console.log("Updated Item: ID=" + updated.id + " isSelected=" + updated.isSelected);
    this.items[updated.id].isSelected = updated.isSelected;
    this.checkBingo(updated.id);
  }

  private checkBingo(id:number):void {
    if(this.checkHorizontal(id) || this.checkVertical(id) || this.checkDiagonal(id)){
      this.bingo = true;
    }
  }

  private checkHorizontal(id:number):boolean {
    const row = this.getRowOfID(id);
    var index = 0;
    var itemID = this.idMap[row][index];
    while(this.items[itemID].isSelected){
      if(index === 4){
        return true;
      }
      index++;
      itemID = this.idMap[row][index];
    }
    return false;
  }

  private checkVertical(id:number):boolean {
    const column = this.getColumnOfID(id);
    var index = 0;
    var itemID = this.idMap[index][column];
    while(this.items[itemID].isSelected){
      if(index === 4){
        return true;
      }
      index++;
      itemID = this.idMap[index][column];
    }
    return false;
  }

  private getRowOfID(id:number):number{
    for(var row = 0; row < 5; row++){
      if(this.idMap[row].includes(id)){
        return row;
      }
    }
    return -1;
  }

  private getColumnOfID(id:number):number{
    const row = this.getRowOfID(id);
    return this.idMap[row].indexOf(id);
  }

  private checkDiagonal(id:number):boolean {
    const leftTopRightBottom = [0, 6, 12, 18, 24];
    const leftBottomRightTop = [4, 8, 12, 16, 20];

    if(this.items[12].isSelected && (leftTopRightBottom.includes(id) || leftBottomRightTop.includes(id))){
      if(leftTopRightBottom.includes(id)){
        var recent = 0;
        var itemID = leftTopRightBottom[recent];
        while(this.items[itemID].isSelected){
          if(recent === 4){
            return true;
          }
          recent++;
          itemID = leftTopRightBottom[recent];
        }
      }
      if(leftBottomRightTop.includes(id)){
        var recent = 0;
        var itemID = leftBottomRightTop[recent];
        while(this.items[itemID].isSelected){
          if(recent === 4){
            return true;
          }
          recent++;
          itemID = leftBottomRightTop[recent];
        }
      }
    }
    return false;
  }
}
