import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../services/administrador.service';
import { Servicio } from '../../interfaces/servicio.interfaces';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})
export class GestionServiciosComponent implements OnInit {

  constructor(private administradorservice : AdministradorService, private form : FormBuilder) { }

  listaservicios : Servicio [] = [];

  formato : string = "pdf";


  obtenerInforme(){
    this.administradorservice.obtenerInformeServicios(this.formato)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title: 'Success', 
          text: 'El informe se ha descargado en: C:/Users/Public/Documents',
          icon: 'success',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,})
    }),
      error: resp => {
        Swal.fire({
          title: 'Success', 
          text: 'El informe se ha descargado en: C:/Users/Public/Documents',
          icon: 'success',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,})
      }
  });

  }



  /**Método para mostrar los servicios */
  mostrarServicios(){
    this.administradorservice.obtenerServicios()
    .subscribe({
      next: (resp => {
       
      this.listaservicios = resp;

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

  /**Método para borrar servicios */
  borrarServicio(referencia : number){
    const refServicio = referencia;
    const index = this.listaservicios.findIndex(i => i.referencia == refServicio);
    Swal.fire({
      title: 'Borrar servicio',
      icon: 'warning'  ,
      text: '¿Quieres borrar este servicio?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorservice.borrarServicio(referencia)
    .subscribe({
      next: (resp => {
        this.listaservicios.splice(index, 1);
        Swal.fire({
          title: 'El servicio ' + referencia + ' ha sido eliminado',
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
          showConfirmButton: false,})
      }
  });
  }
  })
  }

  miFormulario: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    descripcion: ['', [ Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    precio: ['', [ Validators.required, Validators.pattern('^[0-9,$]*$') ]]
  })

  /**Método para editar los servicios */
  editarServicio(referencia : number){
    const index = this.listaservicios.findIndex(i => i.referencia == referencia);
    let servicio =  this.miFormulario.value;
    this.administradorservice.editarServicio(referencia, servicio)
    .subscribe({
      next: (resp =>{

        this.listaservicios.splice(index, 1, resp);
        this.miFormulario.reset();
        this.ngOnInit();
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

  referenciaServicioAEditar : number = 0;
  nombreServicioAEditar : string ='';
  descripcionServicioAEditar : string= '';
  tarifaServicioAEditar : number  = 0;
  
  
  obtenerDatosEdicion(referencia : number){
    this.administradorservice.obtenerServicioPorId(referencia)
    .subscribe({
      next: (resp =>{
        this.referenciaServicioAEditar = resp.referencia;
        this.nombreServicioAEditar = resp.nombre;
        this.descripcionServicioAEditar = resp.descripcion;
        this.tarifaServicioAEditar = resp.precio;
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


  miFormularioPublicado: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    descripcion: ['', [ Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    precio: ['', [ Validators.required, Validators.pattern('^[0-9,$]*$') ]]
  })


  /**Método para publicar un nuevo comentario */
  publicarServicio(){
    let servicio =  this.miFormularioPublicado.value;
    this.administradorservice.addServicio(servicio)
    .subscribe({
      next: (resp =>{
        Swal.fire({
          icon: 'success',
          title: '¡El nuevo servicio ha sido publicado!',
          showConfirmButton: false,
          color: '#3d3d1b',
          background: '#FAE4CF'
        })
        this.listaservicios.push(resp);
        this.miFormularioPublicado.reset();
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




  ngOnInit(): void {
    this.mostrarServicios();
  }

}
