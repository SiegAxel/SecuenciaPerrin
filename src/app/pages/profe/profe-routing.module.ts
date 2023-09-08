import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfePage } from './profe.page';

const routes: Routes = [
  {
    path: '',
    component: ProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfePageRoutingModule {}
