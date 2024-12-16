import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificarPageRoutingModule } from './justificar-routing.module';

import { JustificarPage } from './justificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustificarPageRoutingModule
  ],
  declarations: [JustificarPage]
})
export class JustificarPageModule {}
