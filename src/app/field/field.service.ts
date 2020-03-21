import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private httpClient: HttpClient) {
  }

  readonly idMap = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24]
  ];

  bingo = false;

  items:Item[];

  public async buildNewField():Promise<Item[]>{
    const randomPhraseList = await this.getRandomPhraseList();
    this.items = [];
    for(var i = 0; i < 25; i++){
      const current = new Item();
      current.id = i;
      current.text = randomPhraseList[i];
      current.isSelected = false;
      this.items.push(current);
    }
    return this.items;
  }

  public rebuildField():void{
    this.bingo = false;
    this.buildNewField();
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

  public isBingo():boolean{
    return this.bingo;
  }

  public updateItem(itemUpdate: Item){
    this.items[itemUpdate.id].isSelected = itemUpdate.isSelected;
    this.checkBingo(itemUpdate.id);  
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
    var winningArray = [];
    while(this.items[itemID].isSelected){
      winningArray.push(itemID);
      if(index === 4){
        this.updateGuiAtBingo(winningArray);
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
    var winningArray = [];
    while(this.items[itemID].isSelected){
      winningArray.push(itemID);
      if(index === 4){
        this.updateGuiAtBingo(winningArray);
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

    if(this.items[12].isSelected){
      if(leftTopRightBottom.includes(id)){
        var recent = 0;
        var itemID = leftTopRightBottom[recent];
        while(this.items[itemID].isSelected){
          if(recent === 4){
            this.updateGuiAtBingo(leftTopRightBottom);
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
            this.updateGuiAtBingo(leftBottomRightTop);
            return true;
          }
          recent++;
          itemID = leftBottomRightTop[recent];
        }
      }
    }
    return false;
  }

  private updateGuiAtBingo(winningArray: number[]){
    for(let index of winningArray){
      var element = document.getElementById(index.toString());
      element.className = 'single-item win';
    }
  }
}
