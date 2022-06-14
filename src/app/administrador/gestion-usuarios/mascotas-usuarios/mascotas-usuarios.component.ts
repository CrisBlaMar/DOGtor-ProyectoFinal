import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../services/administrador.service';
import { Mascota } from '../../../interfaces/mascota.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mascotas-usuarios',
  templateUrl: './mascotas-usuarios.component.html',
  styleUrls: ['./mascotas-usuarios.component.css']
})
export class MascotasUsuariosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private administradorService : AdministradorService,
    private rou : Router, private form : FormBuilder) { }
  
  idUsu: string = "";
  ngOnInit(): void {
    this.router.params
    .subscribe( params => {
      this.idUsu = params['email'];
    }
    )
    this.obtenerMascota();
  }

  volver(){
    this.rou.navigate(['/administrador/gestionusuarios']);
      
  }
  
  mascotas : Mascota [] = [];

    /**Método para obtener las mascotas de un usuario en concreto */
  obtenerMascota(){
    this.administradorService.obtenerMascotasUsuario(this.idUsu)
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


  miFormularioEditado: FormGroup = this.form.group({
    especie: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    nombre: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    pelaje:['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    raza: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    sexo: ['',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]]
  })

  chipMascota : number = 0;
  especieMascota : string = '';
  nombreMascota : string = '';
  pelajeMascota : string = '';
  razaMascota : string = '';
  sexoMascota : string = '';
  

  obtenerDatosMascotaAEditar(chip: number){
    this.administradorService.obtenerDatosMascota(chip)
    .subscribe({
      next: (resp =>{
        this.chipMascota = resp.chip;
        this.especieMascota = resp.especie;
        this.nombreMascota =resp.nombre;
        this.pelajeMascota = resp.pelaje;
        this.razaMascota = resp.raza;
        this.sexoMascota = resp.sexo;
      })
      ,
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

  /**Método para editar un mascota de una usuario */
  editarMascota(chip : number){
    const index = this.mascotas.findIndex(i => i.chip == chip);
    let mascotaedi =  this.miFormularioEditado.value;
    this.administradorService.editarMascota(chip, mascotaedi)
    .subscribe({
      next: (resp =>{
        this.mascotas.splice(index, 1, resp);
        this.miFormularioEditado.reset();
        
      })
      ,
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

    /**Método para borrar un usuario */
    borrarMascota(chip: number){
      const index = this.mascotas.findIndex(i => i.chip == chip);
      Swal.fire({
        title: 'Borrar Mascota',
        icon: 'warning'  ,
        text: '¿Quieres borrar a la mascota con chip ' + chip +' ?',
        color: '#3d3d1b',
        background: '#FAE4CF',
        confirmButtonColor: '#6D6D43',
        cancelButtonColor: '#A52A2A',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
      this.administradorService.borrarMascota(chip)
      .subscribe({
        next: (resp => {
          this.mascotas.splice(index, 1);
          Swal.fire({ 
            title: 'La mascota '+ resp.nombre +' ha sido eliminada',
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




}
