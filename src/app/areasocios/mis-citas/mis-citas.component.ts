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





  ngOnInit(): void {
    this.mostrarCitas();
  }

}
