import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"", component: HomeComponent, pathMatch: "full"
  },
  {
    path: 'servicios',
    loadChildren: () => import('./nuestros-servicios/nuestros-servicios.module').then(m => m.NuestrosServiciosModule)
  },
  {
    path: 'sobrenosotros',
    loadChildren: () => import('./sobre-nosotros/sobre-nosotros.module').then(m => m.SobreNosotrosModule)
  },
  {
    path: 'areasocios',
    loadChildren: () => import('./areasocios/areasocios.module').then(m => m.AreasociosModule)
  },
  {
    path: 'quierosersocio',
    loadChildren: () => import('./quiero-ser-socio/quiero-ser-socio.module').then(m => m.QuieroSerSocioModule)
  },
  {
    path: 'citaprevia',
    loadChildren: () => import('./cita-previa/cita-previa.module').then(m => m.CitaPreviaModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
