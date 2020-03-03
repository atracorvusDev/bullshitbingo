import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { FieldComponent } from './field/field/field.component';
import { ItemComponent } from './field/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
