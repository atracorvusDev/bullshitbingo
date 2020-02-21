import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { ItemComponent } from './item/item.component';



@NgModule({
  declarations: [FieldComponent, ItemComponent],
  imports: [
    CommonModule
  ]
})
export class FieldModule { }
