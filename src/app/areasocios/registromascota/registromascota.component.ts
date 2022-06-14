import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota.interfaces';
import { UsuarioService } from '../usuarios-services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registromascota',
  templateUrl: './registromascota.component.html',
  styleUrls: ['./registromascota.component.css']
})
export class RegistromascotaComponent implements OnInit {

  constructor(private form : FormBuilder, private usuarioservice: UsuarioService,
    private router : Router) { }

  ngOnInit(): void {
  }

  miMascota: FormGroup = this.form.group({
    especie: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    pelaje: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    raza: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    sexo: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]]
  })


  
/**
 * Método para hacer el registro de una mascota
 * Añadir una mascota a un usuario
 */
  hacerRegistro (){
    
    let mascota : Mascota = this.miMascota.value;
    this.usuarioservice.registroMascota(mascota)
    .subscribe({
      next: (resp => {
        this.miMascota.reset();
        Swal.fire({
          title: 'Tu mascota ha sido registrada :)',
          icon: 'success',
          showDenyButton: true,
          confirmButtonColor: '#E9BB97',
          denyButtonColor: '#999966',
          confirmButtonText: 'Volver a Opciones',
          denyButtonText: `Registrar otra mascota`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/areasocios/opciones')
          } else if (result.isDenied) {
            this.router.navigateByUrl("/areasocios/registromascota")
          }
        })
      }),
      error : err => {
        Swal.fire({
          title: 'Error', 
          text: err.error.message, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,})
        
      }
    });
  }
}
