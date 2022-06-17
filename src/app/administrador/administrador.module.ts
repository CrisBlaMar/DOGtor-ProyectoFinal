import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionComentariosComponent } from './gestion-comentarios/gestion-comentarios.component';
import { GestionServiciosComponent } from './gestion-servicios/gestion-servicios.component';
import { MascotasUsuariosComponent } from './gestion-usuarios/mascotas-usuarios/mascotas-usuarios.component';
import { ComentariosPublicadosComponent } from './comentarios-publicados/comentarios-publicados.component';
import { GuardAdmin } from '../areasocios/guardAdmin.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CitasUsurariosComponent } from './gestion-usuarios/citas-usurarios/citas-usurarios.component';
import { HistorialMascotaComponent } from './gestion-usuarios/mascotas-usuarios/historial-mascota/historial-mascota.component';



@NgModule({
  declarations: [
    GestionUsuariosComponent,
    InicioComponent,
    GestionComentariosComponent,
    GestionServiciosComponent,
    MascotasUsuariosComponent,
    ComentariosPublicadosComponent,
    CitasUsurariosComponent,
    HistorialMascotaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GuardAdmin, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService]
})
export class AdministradorModule { }
