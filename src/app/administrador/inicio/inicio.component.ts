import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private adminService: AdministradorService) { }

  nombre : string = "";
  email: string= "";

  mostrarDatos(){

    this.adminService.obtenerDatosUsuario()
    .subscribe({
      next: (resp => {
      this.nombre = resp.nombre;
      this.email = resp.email;
    }),
      error: resp => {
        Swal.fire('Error', resp.error.mensaje, 'error')
        
      }
  });
  }

  ngOnInit(): void {
    this.mostrarDatos();
  }

}
