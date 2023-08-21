import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecconPage } from './reccon.page';

const routes: Routes = [
  {
    path: '',
    component: RecconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecconPageRoutingModule {}
