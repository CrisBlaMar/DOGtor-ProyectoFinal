import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Historial } from 'src/app/interfaces/historial.interfaces';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../usuarios-services/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private routerpa: ActivatedRoute, private usuarioservice : UsuarioService,
    private rou : Router) { }

  chipMascota : number = 0;

  volver(){
    this.rou.navigate(['/areasocios/mimascota']);
      
  }

  ngOnInit(): void {
    this.routerpa.params
    .subscribe( params => {
      this.chipMascota = params['chip'];
    }
    )
    this.verHistorial();
  }

  historial!: Historial;

  verHistorial(){
    this.usuarioservice.obtenerHistorialMascota(this.chipMascota)
    .subscribe({
      next: (resp => {
        this.historial = resp;
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
