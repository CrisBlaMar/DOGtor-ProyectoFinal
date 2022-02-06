import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios/servicios.component';
import { NuestrosServiciosRoutingModule } from '../nuestros-servicios/nuestrosServicios-routing.module';



@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    NuestrosServiciosRoutingModule
  ]
})
export class NuestrosServiciosModule { }