import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../services/administrador.service';
import { Comentario } from '../../interfaces/comentario.interfaces';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-comentarios',
  templateUrl: './gestion-comentarios.component.html',
  styleUrls: ['./gestion-comentarios.component.css']
})
export class GestionComentariosComponent implements OnInit {

  constructor(private administradorservice :AdministradorService) { }

  comentarios : Comentario [] = [];

  mostrarComentariosUsuarios(){
    this.administradorservice.obtenerComentariosUsuarios()
    .subscribe({
      next: (resp =>{
        this.comentarios = resp;
      })
      ,
      error: resp => {
        Swal.fire('Error', resp.error.mensaje, 'error')
        
      }
    })
  }

  /**
   * Método para publicar un comentario 
   */
  publicarComentario(id : number){
    const index = this.comentarios.findIndex(i => i.id == id);
    Swal.fire({
      title: 'Publicar comentario',
      icon: 'warning'  ,
      text: '¿Quieres publicar este comentario?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorservice.obtenerComentarioUsuarioPorId(id)
    .subscribe({
      next: (resp =>{
        this.administradorservice.publicarComentario(id, resp)
        .subscribe({
          next: (resp =>{
            this.comentarios.splice(index, 1);
            Swal.fire({
              title: 'El comentario ha sido publicado correctamente',
              icon: "success",
              color: '#3d3d1b',
              background: '#FAE4CF',
              showConfirmButton: false
              
              
            })
          }),
          error: resp => {
            Swal.fire({
              title: 'Error', 
              text: resp.error.mensaje, 
              icon: 'error',
              color: '#3d3d1b',
              background: '#FAE4CF',
              showConfirmButton: false,
            })
          }
        })
      })
      ,
      error: resp => {
        Swal.fire({
          title: 'Error', 
          text: resp.error.mensaje, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,
        })
        
      }
    })
  }
  })
  }

  /**Método para borrar un comentario */
  borrarComentario(id:number){
    const index = this.comentarios.findIndex(i => i.id == id);
    Swal.fire({
      title: 'Borrar comentario',
      icon: 'warning'  ,
      text: '¿Quieres borrar este comentario?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorservice.borrarComentario(id)
    .subscribe({
      next: (resp =>{
        this.comentarios.splice(index, 1);
        Swal.fire({
          title: 'El comentario ha sido borrado correctamente',
          icon: "success",
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false
        })
        
      }),
      error: resp => {
        Swal.fire({
          title: 'Error', 
          text: resp.error.mensaje, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,
        })
      }
    })
   }
  })
  }

  
  ngOnInit(): void {

    this.mostrarComentariosUsuarios();
    
  }

}
