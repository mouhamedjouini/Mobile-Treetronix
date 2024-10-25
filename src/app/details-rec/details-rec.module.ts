import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsRecPageRoutingModule } from './details-rec-routing.module';

import { DetailsRecPage } from './details-rec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsRecPageRoutingModule
  ],
  declarations: [DetailsRecPage]
})
export class DetailsRecPageModule {}
