import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Comentario } from '../interfaces/comentario.interfaces';
import { ComentarioService } from '../sevicios/Comentario.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit {

  constructor(private comentarioservice : ComentarioService) { }

  
  comentarios : Comentario [] = [];

  /**Método para mostrar los comentarios de los usuarios */
  mostrarComentario(){
    this.comentarioservice.mostrarComentariosPublicados()
    .subscribe({
      next: (resp =>{
        this.comentarios = resp;
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
    })
  }


  ngOnInit(): void {
    this.mostrarComentario();
  }

}