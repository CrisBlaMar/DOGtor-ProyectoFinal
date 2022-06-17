import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuarios-services/usuario.service';
import { Citas } from '../../interfaces/cita.interfaces';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {

  constructor(private usuarioservice : UsuarioService) { }

  citas : Citas [] = [];

  mostrarCitas(){
    
    this.usuarioservice.obtenerCitasUsuario()
    .subscribe({
      next: (resp => {
      this.citas = resp;
      
    }),
      error: resp => {
        Swal.fire({
          title: 'Error', 
          text: resp.error.mensaje, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,})
        
      }
  });
  }

  /**Método para borrar un usuario */
  borrarCita(id: number){
    const index = this.citas.findIndex(i => i.id == id);
    Swal.fire({
      title: 'Borrar Cita',
      icon: 'warning'  ,
      text: '¿Quieres borrar la cita con identificador ' + id +' ?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    this.usuarioservice.borrarCita(id)
    .subscribe({
      next: (resp => {
        this.citas.splice(index, 1);
        Swal.fire({ 
          title: 'La cita ha sido eliminada',
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
