import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmailService } from './email.service';

@Component({
  selector: 'app-formucontacto',
  templateUrl: './formucontacto.component.html',
  styleUrls: ['./formucontacto.component.css']
})
export class FormucontactoComponent implements OnInit {

  constructor(private emailservice : EmailService, private form : FormBuilder) { }
  email = localStorage.getItem("email");
  
  mensaje: FormGroup = this.form.group({
    to: ['crisblanco96@gmail.com'],
    subject: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    text : ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')] ] 
  })


  /**
   * Método para enviar un mensaje
   */
  enviarmensaje(){
    this.emailservice.enviarMensaje(this.mensaje.value)
    .subscribe({
      next: (resp =>{
        this.mensaje.reset();
        Swal.fire({
          title: '¡Su correo ha sido enviado!',
          icon: 'success',
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
