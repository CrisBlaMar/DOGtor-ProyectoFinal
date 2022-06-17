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
          this.comprobarRol();
        }
    );
    this.mostrarCerrarSesion();
    this.cambiarnavbar();
    
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
      this.usuarioService.obtenerDatosUsuario()
      .subscribe({
        next: (resp =>{
          this.rol = resp.role;
          this.cambiarnavbar();
        }),
        error: resp => {
          this.navbarUsuario = true;
          this.navbarAdmin= false;
        }
      })
      
      
  }

//método para cambiar el navbar dependiendo del rol del usuario que este logueado
  cambiarnavbar(){
    if(this.rol == "ADMIN"){
      this.navbarUsuario = false;
      this.navbarAdmin = true;
    }else{
      this.navbarUsuario = true;
      this.navbarAdmin = false;
    }
  }

}
