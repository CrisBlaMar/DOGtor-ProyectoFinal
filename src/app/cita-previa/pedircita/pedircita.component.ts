import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../interfaces/mascota.interfaces';
import { UsuarioService } from '../../areasocios/usuarios-services/usuario.service';
import Swal from 'sweetalert2';
import { ServicioService } from '../../nuestros-servicios/servicios/servicios.service';
import { CitaService } from '../cita.service';
import { Cita } from 'src/app/interfaces/cita.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedircita',
  templateUrl: './pedircita.component.html',
  styleUrls: ['./pedircita.component.css']
})
export class PedircitaComponent implements OnInit {

  constructor(private form : FormBuilder, private usuarioservice : UsuarioService, private servicioService : ServicioService,
    private citaservice : CitaService ) { }

  mascotas : Mascota [] = [];
  masco!: Mascota;

  fechaActual = new Date();
  

  citaPrevia: FormGroup = this.form.group({
    fecha:[],
    mascota : []

  })
  

  /**
   * Método para mostrar las mascotas de un usuario y así poder seleccionar
   * a que mascota queremos pedirle la cita
   */
  mostrarMascotas(){
    
    this.usuarioservice.obtenerMascotasUsuario()
    .subscribe({
      next: (resp => {
      this.mascotas = resp;

    }),
      error: resp => {
        Swal.fire('Error', resp.error.message, 'error')
        
      }
  });
  }
 



/**
 * Método para realizar una cita previa
 */
  realizarCita(){
    let fecha: Date = this.citaPrevia.value.fecha.replace("T"," ");
    let cita : Cita = { "fecha": fecha};
    this.citaservice.realizarCitaPrevia(cita, this.citaPrevia.value.mascota)
    .subscribe({
      next:  (resp=>{
        this.citaPrevia.reset();
        Swal.fire({
          title: '¡Su cita ha sido registrada satisfactoriamente!',
          icon: 'success',
          showConfirmButton: false,
          color: '#3d3d1b',
          background: '#FAE4CF'
        })
      })
      ,
      error: resp => {
        console.log(resp);
        Swal.fire({
          title: 'Error', 
          text: resp.error.mensaje, 
          icon: 'error',
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false,});
        
      }
    });
    
  }







  ngOnInit(): void {
    //Recordar SIEMPRE llamar aquí al método para que nos cargue los datos al cargar la página
    this.mostrarMascotas();
  }

}
