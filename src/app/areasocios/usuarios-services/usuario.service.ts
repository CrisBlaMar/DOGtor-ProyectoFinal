import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthResponse} from '../../interfaces/interfaces';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { Mascota } from '../../interfaces/mascota.interfaces';
import { Observable} from 'rxjs';
import {  Citas } from 'src/app/interfaces/cita.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpclient: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  /**Método para hacer login */
  login(email:string, contrasenia: string){
    const url = `${this.baseUrl}/auth/login`;
    const body =  {email, contrasenia};
    const opcionHeader = new HttpHeaders();
    opcionHeader.append('Access-Control-Allow-Origin','*');
    return this.httpclient.post<AuthResponse>(url, body, {headers:opcionHeader}); 
  }


  /**Método para validar el token */
  validarToken() : Observable<AuthResponse>{
    const url = `${ this.baseUrl }/auth/login`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return this.httpclient.get<AuthResponse>( url, { headers } )     
  }

  /**Método para registrar un usuario */
  registro(usuario : Usuario){
    const url = `${this.baseUrl}/auth/register`;
    const body = usuario;
    const opcionHeader = new HttpHeaders();
    opcionHeader.append('Access-Control-Allow-Origin','*');
    return this.httpclient.post<Usuario>(url, body, {headers:opcionHeader}); 
  }

  /**Método para registrar mascotas a un usuario */
  registroMascota (mascota : Mascota){
    const url = `${this.baseUrl}/user/mascota`;
    const body =  mascota;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);

    return this.httpclient.post<AuthResponse>(url, body, {headers:opcionHeader});
  }



  /**Método para obtener del token el usuario y su email */
  getIdUsuario(){
    const url = `${this.baseUrl}/user`;
    let token = localStorage.getItem("token")
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    this.httpclient.get<string>(url, {headers : opcionHeader})
    .subscribe(
      resp =>{
        localStorage.setItem('email', JSON.stringify(resp));
      }
    )
  }
  
  /**Método para listar las mascotas de un usuario */
  obtenerMascotasUsuario(){
    const url = `${this.baseUrl}/user/mascota`;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<Mascota []>(url, {headers:opcionHeader});
    
  }


  /**Método para obtener los datos de un usuario */
  obtenerDatosUsuario (){
    const url = `${this.baseUrl}/usuario`;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<Usuario>(url, {headers:opcionHeader});
  }

  /**Método para editar los datos de una mascota */
  editarMascota(chip : number){
    const url = `${this.baseUrl}/user/mascota/${chip}`;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<Mascota>(url, {headers:opcionHeader});
  }

  /**Método para obtener todas las citas de un usuario */
  obtenerCitasUsuario(){
    const url = `${this.baseUrl}/user/cita`;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<Citas []>(url, {headers:opcionHeader});
  }

}
