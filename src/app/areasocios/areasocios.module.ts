import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AreaSociosRoutingModule } from './areasocios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OpcionesComponent } from './opciones/opciones.component';
import { Guard } from './guard.service';
import { MimascotaComponent } from './mimascota/mimascota.component';
import { RegistromascotaComponent } from './registromascota/registromascota.component';
import { MisdatosComponent } from './misdatos/misdatos.component';
import { DondeEstoyModule } from '../donde-estoy/donde-estoy.module';
import { EditarDatosComponent } from './editar-datos/editar-datos.component';
import { HijoComponent } from './hijo/hijo.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    LoginComponent,
    OpcionesComponent,
    MimascotaComponent,
    RegistromascotaComponent,
    MisdatosComponent,
    EditarDatosComponent,
    HijoComponent,
    MisCitasComponent
  ],
  imports: [
    CommonModule,
    AreaSociosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DondeEstoyModule
  ],
  providers: [Guard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService]
})
export class AreasociosModule { }
