import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { GestionCitasComponent } from './gestion-citas/gestion-citas.component';
import { GestionServiciosComponent } from './gestion-servicios/gestion-servicios.component';
import { GestionComentariosComponent } from './gestion-comentarios/gestion-comentarios.component';
import { MascotasUsuariosComponent } from './gestion-usuarios/mascotas-usuarios/mascotas-usuarios.component';
import { ComentariosPublicadosComponent } from './comentarios-publicados/comentarios-publicados.component';
import { GuardAdmin } from '../areasocios/guardAdmin.service';
import { CitasUsurariosComponent } from './gestion-usuarios/citas-usurarios/citas-usurarios.component';
import { HistorialMascotaComponent } from './gestion-usuarios/mascotas-usuarios/historial-mascota/historial-mascota.component';
const routes: Routes = [
  {
    path:'', component: InicioComponent, canActivate: [GuardAdmin]
    //Hay que quitar el path full, porque no nos mostraria bien el resto de páginas
     
  }, 
{ path: 'inicioAdmin', component: InicioComponent,canActivate: [GuardAdmin]},
{ path: 'gestionusuarios', component: GestionUsuariosComponent,canActivate: [GuardAdmin]},
{ path: 'gestioncitas', component: GestionCitasComponent,canActivate: [GuardAdmin]},
{ path: 'gestionservicios', component: GestionServiciosComponent,canActivate: [GuardAdmin]},
{ path: 'gestioncomentarios', component: GestionComentariosComponent,canActivate: [GuardAdmin]},
{ path: 'gestionusuarios/mascotasusuarios/:email', component: MascotasUsuariosComponent,canActivate: [GuardAdmin]},
{ path: 'gestionusuarios/citasusuarios/:email', component: CitasUsurariosComponent,canActivate: [GuardAdmin]},
{ path: 'gestionusuarios/mascotasusuarios/:email/mascota/:chip/historial', component: HistorialMascotaComponent,canActivate: [GuardAdmin]},
{ path: 'comentariospubli', component: ComentariosPublicadosComponent, canActivate: [GuardAdmin]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }