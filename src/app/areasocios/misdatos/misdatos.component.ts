import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuarios-services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css']
})
export class MisdatosComponent implements OnInit {

  constructor(private usuarioservice : UsuarioService) { }

  mensajehijo: string= '';
  /**
   * Para mostrar el mensaje del componenete hijo del que 
   * sacamos el mensaje
   * @param mensaje , que vamos a recibir
   */
  eventohijo(mensaje: string){
    this.mensajehijo = mensaje;
  }
  

  nombre: string ='';
  apellidos: string ='';
  email: string ='';
  telefono: string ='';
  dni: string ='';

  /**
   * Método para mostrar los datos del usuario
   */
  mostrarDatos(){

    this.usuarioservice.obtenerDatosUsuario()
    .subscribe({
      next: (resp => {
      this.email = resp.email;
      this.apellidos = resp.apellidos;
      this.nombre = resp.nombre;
      this.telefono = resp.telefono;
      this.dni= resp.dni;

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
    this.mostrarDatos();
  }

}
