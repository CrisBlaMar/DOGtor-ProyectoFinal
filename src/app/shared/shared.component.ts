import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../areasocios/usuarios-services/usuario.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  constructor(private router : Router, private usuarioService : UsuarioService){}

  parametro!: Subscription;

  ngOnInit(){

    this.parametro = this.router.events
      .subscribe(
        res => {
          this.mostrarCerrarSesion();
          this.cambiarnavbar();
          
        }
    );
    this.mostrarCerrarSesion();
    
  }

  cerrarSesion(){
    localStorage.clear();
    this.rol = "";
    this.router.navigateByUrl('');
    
  }

  mostrar: boolean = true;

  mostrarCerrarSesion(){
    if(localStorage.getItem('token')){
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
  }

  navbarUsuario: boolean = true;
  navbarAdmin: boolean = false;
  rol: string = '';

  comprobarRol(){
    if(localStorage.getItem('token')){
      this.usuarioService.obtenerDatosUsuario()
      .subscribe({
        next: (resp =>{
          this.rol = resp.role;
        }),
        error: resp => {
          this.navbarUsuario = true;
          this.navbarAdmin= false;
        }
      })
    }else{
      this.rol = "";
    }
      
  }

//método para cambiar el navbar dependiendo del rol del usuario que este logueado
  cambiarnavbar(){
    this.comprobarRol();
    if(this.rol == "ADMIN"){
      this.navbarUsuario = false;
      this.navbarAdmin = true;
    }else{
      this.navbarUsuario = true;
      this.navbarAdmin = false;
    }
  }

}
