import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes = [
  {
    path:"", component: NosotrosComponent, pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SobreNosotrosRoutingModule { }