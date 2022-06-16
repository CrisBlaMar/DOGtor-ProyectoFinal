import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../../services/administrador.service';
import { Historial } from '../../../../interfaces/historial.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial-mascota',
  templateUrl: './historial-mascota.component.html',
  styleUrls: ['./historial-mascota.component.css']
})
export class HistorialMascotaComponent implements OnInit {

  constructor(private routerpa: ActivatedRoute, private adminservice : AdministradorService,
    private rou : Router, private form : FormBuilder) { }


  chipMascota : number = 0;

  ngOnInit(): void {
    this.routerpa.params
    .subscribe( params => {
      this.chipMascota = params['chip'];
    }
    )
    this.verHistorial();
  }


  volver(){
    this.rou.navigate(['/administrador/gestionusuarios']);
      
  }


  historial!: Historial;

  verHistorial(){
    this.adminservice.obtenerHistorialMascota(this.chipMascota)
    .subscribe({
      next: (resp => {
        this.historial = resp;
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


  nuevoHistorial: FormGroup = this.form.group({
    contenido: []
  })

  /**Método para añadir un historial a una mascota que no tenga ningun historial abierto */
  addhistorialMascota(){
    this.adminservice.añadirHistorialAMascota(this.chipMascota, this.nuevoHistorial.value)
    .subscribe({
      next: (resp => {
        this.nuevoHistorial.reset();
        this.ngOnInit();
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

  idhis: number = 0;
  contenido: string = '';

  obtenerDatoshistorial( identificador : number ){
    this.adminservice.obtenerDatosHistorial(identificador)
    .subscribe({
      next: (resp =>{
        this.idhis = resp.id;
        this.contenido = resp.contenido;
      })
      ,
      error: resp => {
        Swal.fire({
          title: 'Error', 
          text: resp, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,})
        
      }
    })
  }

  edicionHistorial: FormGroup = this.form.group({
    contenido: []
  })


  /**Método para editar el historial de una mascota  */
  editarHistorial(){
    this.adminservice.editarHistorialMascota(this.chipMascota, this.edicionHistorial.value, this.idhis)
    .subscribe({
      next: (resp => {
        this.edicionHistorial.reset();
        this.ngOnInit();
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



}
