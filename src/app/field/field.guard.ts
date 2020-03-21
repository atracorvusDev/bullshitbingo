import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from './item';
import { FieldService } from './field.service';

@Injectable({
  providedIn: 'root'
})
export class FieldGuard implements Resolve<Item[]> {
 
  constructor(private fieldService:FieldService){
  }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Item[]> | Promise<Item[]> | Item[] {
    return this.fieldService.buildNewField();
  }
}