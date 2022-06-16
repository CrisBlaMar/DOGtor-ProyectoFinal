import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { Guard } from './guard.service';
import { RegistromascotaComponent } from './registromascota/registromascota.component';
import { MimascotaComponent } from './mimascota/mimascota.component';
import { MisdatosComponent } from './misdatos/misdatos.component';
import { EditarDatosComponent } from './editar-datos/editar-datos.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { HistorialComponent } from './mimascota/historial/historial.component';
const routes: Routes = [
  {
    path:'', component: LoginComponent
    //Hay que quitar el path full, porque no nos mostraria bien el resto de páginas
     
  }, 
  //Misdatos no puede ser un hijo de areasocios, porque cuando intentamos mostrar el contenido
  //en el navegador sustituyendonos la pagina de login por la del area de socios, el app-routing
  //no sabe a quien llamar, porque si lo pusieramos como un hijo, no nos sustituiría el login,
  //lo que haría sería añadirlo dentro del propio componente donde se está mostrando el login 
{ path:'opciones', component: OpcionesComponent, canActivate: [Guard]},
{ path:'registromascota', component: RegistromascotaComponent, canActivate: [Guard]},
{ path:'mimascota', component: MimascotaComponent, canActivate: [Guard]},
{ path:'misdatos', component: MisdatosComponent, canActivate: [Guard]},
{ path:'editardatos', component:EditarDatosComponent, canActivate: [Guard]},
{ path: 'miscitas', component:MisCitasComponent, canActivate: [Guard]},
{ path: 'mimascota/:chip/historial', component: HistorialComponent, canActivate: [Guard]}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaSociosRoutingModule { }