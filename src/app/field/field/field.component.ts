import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) {
   }

  ngOnInit(): void {
    this.items = new Array();
    this.buildNewField();
  }

  isBingo():boolean{
    return this.bingo;
  }

  private async buildNewField(){
    const randomPhraseList = await this.getRandomPhraseList();
    for(var i = 0; i < 25; i++){
      const current = new Item();
      current.id = i;
      current.text = randomPhraseList[i];
      current.isSelected = false;
      this.items.push(current);
    }
  }

  private async getRandomPhraseList():Promise<string[]> {
    const phrases = await this.getListFromFile();
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

  private async getListFromFile():Promise<string[]> {
    const placeholder = "Platzhalter-";

    var dataFromFile = await this.httpClient.get('./assets/phrases.txt', {responseType: 'text'}).toPromise();
    
    const phrases = dataFromFile.split("\n");

    for(var i = 1; phrases.length < 25; i++){
      phrases.push(placeholder+i);
    }

    return phrases;
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
