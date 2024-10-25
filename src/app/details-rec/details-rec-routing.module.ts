import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsRecPage } from './details-rec.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsRecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRecPageRoutingModule {}
