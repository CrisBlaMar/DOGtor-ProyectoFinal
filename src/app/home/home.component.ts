import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComentarioService } from '../sevicios/Comentario.service';
import { Comentario } from '../interfaces/comentario.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private form : FormBuilder, private comentarioService : ComentarioService) { }

  comentario: FormGroup = this.form.group({
    titulo: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    usuario: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    contenido: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')] ] 
  })

  enviarComentario(){
    this.comentarioService.enviarComentarioUsuario(this.comentario.value)
    .subscribe({
      next: (resp =>{
        this.comentario.reset();
        Swal.fire({
          icon: 'success',
          title: '¡Su comentario ha sido enviado!',
          showConfirmButton: false,
          color: '#3d3d1b',
          background: '#FAE4CF'
        })
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

  }

}
