import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'admin/:nombre',
        loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
      },
      {
        path: 'api/:nombre',
        loadChildren: () => import('../api/api.module').then( m => m.ApiPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
