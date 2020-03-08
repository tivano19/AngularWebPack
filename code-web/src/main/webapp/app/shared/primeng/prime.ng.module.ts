import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';


@NgModule({
  imports: [
    ButtonModule,
    MenubarModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    MenubarModule,
    ToastModule
  ]
})
export class PrimeNgModule {}
