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

  borrarCita(id : number){
    const index = this.citas.findIndex(i => i.id == id);
    Swal.fire({
      title: 'Borrar Cita',
      icon: 'warning'  ,
      text: '¿Quieres borrar la cita ' + id + ' ?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorservice.borrarCita(id)
    .subscribe({
      next: (resp => {
        this.citas.splice(index, 1);
        Swal.fire({
          title: 'La cita ' + id + ' ha sido eliminada',
          icon: "success",
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false
        })
    }),
      error: resp => {
        Swal.fire({
          title: 'Error', 
          text: resp.error.message, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,})
      }
  });
  }
  })
  }




  ngOnInit(): void {
    this.mostrarCitas();
  }

}
