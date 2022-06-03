import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario.interfaces';
import Swal from 'sweetalert2';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-comentarios-publicados',
  templateUrl: './comentarios-publicados.component.html',
  styleUrls: ['./comentarios-publicados.component.css']
})
export class ComentariosPublicadosComponent implements OnInit {

  constructor(private administradorservice :AdministradorService) { }

  comentarios : Comentario [] = [];

  mostrarComentariosUsuarios(){
    this.administradorservice.mostrarComentariosPublicados()
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
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorservice.borrarComentarioPublicado(id)
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
