import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../services/administrador.service';
import { Cita, Citas } from '../../../interfaces/cita.interfaces';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Mascota } from 'src/app/interfaces/mascota.interfaces';
import { Email } from '../../../interfaces/email.interfaces';

@Component({
  selector: 'app-citas-usurarios',
  templateUrl: './citas-usurarios.component.html',
  styleUrls: ['./citas-usurarios.component.css']
})
export class CitasUsurariosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private administradorservice : AdministradorService,
    private rou: Router, private form : FormBuilder) { }

  idUsu: string = "";
  
  ngOnInit(): void {
    this.router.params
    .subscribe( params => {
      this.idUsu = params['email'];
    }
    )
    this.obtenerCitas();
    this.obtenerMascota();
  }

  volver(){
    this.rou.navigate(['/administrador/gestionusuarios']);
      
  }
  
  citas : Citas [] = [];

    /**Método para obtener las mascotas de un usuario en concreto */
  obtenerCitas(){
    this.administradorservice.obtenerCitasUsuario(this.idUsu)
    .subscribe({
      next: (resp => {
        this.citas = resp;
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


  /**Método para borrar un usuario */
  borrarCita(id: number){
    const index = this.citas.findIndex(i => i.id == id);
    Swal.fire({
      title: 'Borrar Cita',
      icon: 'warning'  ,
      text: '¿Quieres borrar la cita con identificador ' + id +' ?',
      color: '#3d3d1b',
      background: '#FAE4CF',
      confirmButtonColor: '#6D6D43',
      cancelButtonColor: '#A52A2A',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    this.administradorservice.borrarCita(id)
    .subscribe({
      next: (resp => {
        this.citas.splice(index, 1);
        this.enviarmensaje();
        Swal.fire({ 
          title: 'La cita ha sido eliminada',
          icon: "success",
          color: '#3d3d1b',
          background: '#FAE4CF',
          showConfirmButton: false
        })
       
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
  })
  }

  /**
   * Método para enviar un mensaje
   */
  enviarmensaje(){
    this.administradorservice.enviarMensaje(this.idUsu)
    .subscribe({
      next: (resp =>{
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
    })
  }


  mascotas : Mascota [] = [];

    /**Método para obtener las mascotas de un usuario en concreto */
  obtenerMascota(){
    this.administradorservice.obtenerMascotasUsuario(this.idUsu)
    .subscribe({
      next: (resp => {
        this.mascotas = resp;
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



  citaPrevia: FormGroup = this.form.group({
    fecha:[],
    mascota : []

  })

  /**
 * Método para realizar una cita previa
 */
   realizarCita(){
    let fecha: Date = this.citaPrevia.value.fecha.replace("T"," ");
    let cita : Cita = {"fecha": fecha};
    this.administradorservice.realizarCitaPrevia(cita, this.citaPrevia.value.mascota, this.idUsu)
    .subscribe({
      next:  (resp=>{
        this.citaPrevia.reset();
        this.ngOnInit();
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


}
