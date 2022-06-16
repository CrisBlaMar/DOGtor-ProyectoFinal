import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuarios-services/usuario.service';
import { Mascota } from '../../interfaces/mascota.interfaces';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mimascota',
  templateUrl: './mimascota.component.html',
  styleUrls: ['./mimascota.component.css']
})
export class MimascotaComponent implements OnInit {

  constructor(private usuarioservice : UsuarioService, private router : Router) { }

  mascota : Mascota [] = [];
  

  /**
   * Método para mostrar las mascotas de un usuario
   */
  mostrarMascotas(){
    
    this.usuarioservice.obtenerMascotasUsuario()
    .subscribe({
      next: (resp => {
      this.mascota = resp;
      
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


  

  ngOnInit(): void {
    

    this.mostrarMascotas();
  }

}
