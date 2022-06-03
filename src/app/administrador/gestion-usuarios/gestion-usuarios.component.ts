import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import Swal from 'sweetalert2';
import { AdministradorService } from '../services/administrador.service';
import { Mascota } from '../../interfaces/mascota.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../areasocios/usuarios-services/usuario.service';
import { EmailValidacionServices } from 'src/app/quiero-ser-socio/emailvali.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  constructor(private form : FormBuilder, private administradorService : AdministradorService
    , private usuarioservice : UsuarioService, private emailservice : EmailValidacionServices,
    private router : Router) { }

  

  ngOnInit(): void {
    this.mostrarUsuarios();
   
  }

  usuariosUsers : Usuario [] = [];

  mostrarUsuarios(){
    this.administradorService.obtenerUsuarios()
    .subscribe({
      next: (resp => {
        /**Añadimos a la lista todos los usuarios que NO tengan el rol de ADMIN  */
        this.usuariosUsers = resp.filter((item) => item.role !== "ADMIN");
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
  borrarUsuario(email: string){
    const index = this.usuariosUsers.findIndex(i => i.email == email);
    Swal.fire({
      title: 'Borrar Usuario',
      icon: 'warning'  ,
      text: '¿Quieres borrar a ' + email + ' ?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorService.borrarUsuario(email)
    .subscribe({
      next: (resp => {
        this.usuariosUsers.splice(index, 1);
        Swal.fire({
          title: 'El usuario ' + email + ' ha sido eliminado',
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

  miFormularioEditado: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    apellidos: ['', [ Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    telefono: ['', [ Validators.required, Validators.pattern('^[0-9,$]*$')]],
    dni:['', [ Validators.required, Validators.pattern('[0-9]{8}[A-Za-z]{1}')]]
  })


  /**Método para editar los servicios */
  editarUsuario(email : string){
    const index = this.usuariosUsers.findIndex(i => i.email == email);
    let usuario =  this.miFormularioEditado.value;
    this.administradorService.editarUsuario(email, usuario)
    .subscribe({
      next: (resp =>{
        this.usuariosUsers.splice(index, 1, resp);
        this.miFormularioEditado.reset();
        
      })
      ,
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


  nombreUsuario: string ='';
  apellidosUsuario: string ='';
  emailUsuario: string ='';
  telefonoUsuario: string ='';
  dniUsuario: string ='';


  obtenerDatosEdicion(email : string){
    this.administradorService.obtenerUsuarioPorEmail(email)
    .subscribe({
      next: (resp =>{
        this.emailUsuario = resp.email;
        this.apellidosUsuario = resp.apellidos;
        this.nombreUsuario = resp.nombre;
        this.telefonoUsuario = resp.telefono;
        this.dniUsuario = resp.dni;
      })
      ,
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







  miFormulario: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    apellidos: ['', [ Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    email: ['', [ Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')], [this.emailservice]],
    contrasenia: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    telefono: ['', [ Validators.required, Validators.pattern('^[0-9,$]*$') ] ],
    dni:['', [ Validators.required, Validators.pattern('[0-9]{8}[A-Za-z]{1}') ]]
  })

  

  /**
   * Método para un registro de un nuevo usuario 
   */
   hacerRegistro (){
    let usuario : Usuario = this.miFormulario.value;
    if(this.miFormulario.valid){
      this.usuarioservice.registro(usuario)
      .subscribe({
        next: (resp => {
          Swal.fire({
            icon: 'success',
            title: '¡El nuevo usuario ha sido registrado!',
            showConfirmButton: false,
            color: '#3d3d1b',
            background: '#FAE4CF'
          })
          this.miFormulario.reset();
          this.usuariosUsers.push(resp);
          
        }),
        error : err => {
          Swal.fire({
            title: 'Error', 
            text: err.error.mensaje, 
            icon: 'error',
            color: '#3d3d1b',
            background: '#FAE4CF',
            showConfirmButton: false,}
          )
          
        }
      });
    }
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  get emailErrorMessage(): string {   
    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'Debe introducir un email';
    } else if ( errors['pattern'] ) { 
      return 'El email no tiene un formato correcto';
    } else if ( errors['enUso'] ) {
      return 'El email ya se encuentra registrado, pruebe con otro';
    }

    return '';
  }


}
