import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificarPage } from './justificar.page';

const routes: Routes = [
  {
    path: '',
    component: JustificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificarPageRoutingModule {}
