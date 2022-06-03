import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios-services/usuario.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  constructor(private usuarioservice : UsuarioService,
    private router : Router, private roltoken : JwtHelperService) { }
  


  usuario = {
    nombre: '',
    contrasenia: '',
    apellidos: '',
    dni: '',
    telefono:'',
    email: '',
  };


/**
 * Método para hacer login con un usuario y contraseña
 */
  login() {
    this.usuarioservice.login( this.usuario.email, this.usuario.contrasenia )
    .subscribe({
        next: (resp => {
          
          localStorage.setItem('token',resp.access_token!) //añadimos al localstorage el token que genera la peticion de login
          let rol = this.roltoken.decodeToken(resp.access_token).rol;
          localStorage.setItem('rol', this.roltoken.decodeToken(resp.access_token).rol);
          
          this.usuarioservice.getIdUsuario(); //llamamos a este método para que cuando hagamos login nos guarde en el localstorage el email del usuario
         
          if(rol == 'USER'){
            this.router.navigateByUrl('/areasocios/opciones');
          }else{
            this.router.navigateByUrl('/administrador/inicioAdmin');
          }
          
          
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
  }

}
