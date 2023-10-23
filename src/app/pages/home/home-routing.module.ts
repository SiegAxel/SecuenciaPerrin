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
        path: 'profe/:nombre',
        loadChildren: () => import('../profe/profe.module').then( m => m.ProfePageModule)
      },
      {
        path: 'alumno/:nombre',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
