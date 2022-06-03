import { Component, OnDestroy, OnInit } from '@angular/core';
import { Servicio } from '../../interfaces/servicio.interfaces';
import { ServicioService } from './servicios.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Tarifa } from '../../interfaces/tarifa.interfaces';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnDestroy, OnInit{

  constructor(private servicioService : ServicioService) { }

  servicios : Servicio [] = [];
  tarifas : Tarifa [] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

/**
 * Método para mostrar los servicios
 */
  mostrarServicios(){
    this.servicioService.obtenerServicios()
    .subscribe({
      next: (resp => {
      this.servicios = resp;
      this.dtTrigger.next(null); 
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
    this.mostrarServicios();

     this.dtOptions = {
        pagingType: 'full_numbers',
        lengthMenu: [5, 10, 100], //al ponerlo aquí nunca funciona, tengo que añadirlo en el html
        processing: true,
        language: {
          url: 'http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
          }
      };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
