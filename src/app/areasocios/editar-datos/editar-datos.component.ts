import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import Swal from 'sweetalert2';
import { EditarDatosService } from './editar-datos.service';
import { UsuarioService } from '../usuarios-services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
  styleUrls: ['./editar-datos.component.css']
})
export class EditarDatosComponent implements OnInit {

  carga : boolean = false;

  constructor(private editardatosservice : EditarDatosService, private form : FormBuilder, 
    private usuarioservice : UsuarioService, private router : Router) { }

  miFormulario: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    apellidos: ['', [ Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    telefono: ['', [ Validators.required, Validators.pattern('^[0-9,$]*$') ] ],
    dni:['', [ Validators.required, Validators.pattern('[0-9]{8}[A-Za-z]{1}') ]]
  })

  


  /**Método para editar los datos del usuario */
  editarMisDatos(){
    let usuario : Usuario = this.miFormulario.value;
    if(this.miFormulario.valid){
      this.editardatosservice.editarmisDatos(usuario)
      .subscribe({
        next: (resp =>{
          this.router.navigateByUrl('/areasocios/misdatos');
          this.miFormulario.reset();
          
        
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
      });}

  }


  nombreUsuario: string ='';
  apellidosUsuario: string ='';
  emailUsuario: string ='';
  telefonoUsuario: string ='';
  dniUsuario: string ='';

  /**
   * Método para mostrar los datos del usuario
   */
   mostrarDatos(){
    this.usuarioservice.obtenerDatosUsuario()
    .subscribe({
      next: ((resp: { email: string; apellidos: string; nombre: string; telefono: string; dni: string; }) => {
      this.emailUsuario = resp.email;
      this.apellidosUsuario = resp.apellidos;
      this.nombreUsuario = resp.nombre;
      this.telefonoUsuario = resp.telefono;
      this.dniUsuario = resp.dni;
      this.carga = true;

    }),
      error: (resp: { error: { mensaje: string | undefined; }; }) => {
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
