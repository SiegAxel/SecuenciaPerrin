import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestconPage } from './restcon.page';

const routes: Routes = [
  {
    path: '',
    component: RestconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestconPageRoutingModule {}
