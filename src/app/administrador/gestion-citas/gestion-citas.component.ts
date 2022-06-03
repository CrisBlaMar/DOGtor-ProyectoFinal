import { Component, OnInit } from '@angular/core';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import Swal from 'sweetalert2';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.css']
})
export class GestionCitasComponent implements OnInit {

  constructor(private administradorservice : AdministradorService) { }

  citas : Citas [] = [];

  mostrarCitas(){
    this.administradorservice.obtenerCitas()
    .subscribe({
      next: (resp => {
       
      this.citas = resp; 
    }),
      error: resp => {
        Swal.fire('Error', resp.error.mensaje, 'error')
      }
  });
  }




  ngOnInit(): void {
    this.mostrarCitas();
  }

}
