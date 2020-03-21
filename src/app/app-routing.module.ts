import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FieldComponent } from './field/field/field.component';
import { FieldGuard } from './field/field.guard';

const routes: Routes = [
  {
    path: '', component: FieldComponent,
    resolve: {
      items: FieldGuard
    }
  }
];

@NgModule ( {
  imports: [ RouterModule.forRoot ( routes, {
    useHash           : false, anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules/*, enableTracing: true*/
  } )
  ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
