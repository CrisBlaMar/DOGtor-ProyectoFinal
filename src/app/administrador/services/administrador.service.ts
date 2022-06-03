import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { Cita, Citas } from '../../interfaces/cita.interfaces';
import { Servicio } from '../../interfaces/servicio.interfaces';
import { Mascota } from 'src/app/interfaces/mascota.interfaces';
import { Comentario } from '../../interfaces/comentario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private httpclient: HttpClient) { }

  private baseUrl: string = environment.baseUrl;


  /**Método para obtener todos los usuarios registrados en el sistema */
  obtenerUsuarios(){
    const url = `${this.baseUrl}/usuarios`;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<Usuario[]>(url, {headers:opcionHeader});
  }

  /**Método para obtener todas las citas registradas */
  obtenerCitas(){
    const url = `${this.baseUrl}/cita`;
    return this.httpclient.get<Citas[]>(url);
  }

  /**Método para obtener todos los servicios ofrecidos por la clínica */
  obtenerServicios(){
    const url = `${this.baseUrl}/servicio`;
    return this.httpclient.get<Servicio[]>(url);
  }

  /**Método para obetener un servicio por su referencia */
  obtenerServicioPorId(referencia : number){
    const url = `${this.baseUrl}/servicio/${referencia}`
    return this.httpclient.get<Servicio>(url);
  }

  /**Método para borrar un servicio de la clínica */
  borrarServicio(referencia : number){
    const url = `${this.baseUrl}/servicio/${referencia}`
    return this.httpclient.delete<Servicio>(url);
  }

  /**Método para editar un servicio */
  editarServicio(referencia : number, servicio:Servicio){
    const url = `${this.baseUrl}/servicio/${referencia}`
    const body =  servicio;
    return this.httpclient.put<Servicio>(url, body);
  }

  /**Método para añadir un nuevo servicio a la lista de servicios */
  addServicio(servicio : Servicio){
    const url  = `${this.baseUrl}/servicio`
    const body = servicio;
    return this.httpclient.post<Servicio>(url, body);
  }

 
  /**Método para mostrar la lista de mascotas de un usuario */
  mostrarMascotasUsuario(email : string){
    const url = `${this.baseUrl}user/${email}/mascota`
    return this.httpclient.get<Mascota []>(url);
  }
  
  /**Método para obtener los datos de un usuario */
  obtenerDatosUsuario (){
    const url = `${this.baseUrl}/usuario`;
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<Usuario>(url, {headers:opcionHeader});
  }

  /**Método para obtener una lista con los comentarios que han realizado los usuarios
   * para ser validados por el administrador.
   */
  obtenerComentariosUsuarios(){
    const url = `${this.baseUrl}/comenusuario`
    return this.httpclient.get<Comentario []>(url);
  }

  /**Método para publicar un comentario una vez el administrador haya verificado que no
   * incumple las normas
   */
  publicarComentario(id : number, comentario : Comentario){
      const url = `${this.baseUrl}/comenpublicado/${id}`;
      const body = comentario;
      return this.httpclient.post<Comentario>(url, body);
  }

  /**Método para obtener un comentario de usuario por su id */
  obtenerComentarioUsuarioPorId(id : number){
    const url = `${this.baseUrl}/comenusuario/${id}`
    return this.httpclient.get<Comentario>(url);
  }


  /**Método para borrar un comentario que cumpla las "normas" */
  borrarComentario(id : number){
    const url = `${this.baseUrl}/comenusuario/${id}`
    return this.httpclient.delete<Comentario>(url);
  }

  /**Método para borrar un comentario publicado por el administrador*/
  borrarComentarioPublicado (id:number){
    const url = `${this.baseUrl}/comenpublicado/${id}`
    return this.httpclient.delete<Comentario>(url);
  }

  /**Método para mostrar los comentarios que ya han sido publicados */
  mostrarComentariosPublicados(){
    const url = `${this.baseUrl}/comenpublicados`;
    return this.httpclient.get<Comentario[]>(url);
  }

  /**Método para que el administrador pueda borrar un usuario */
  borrarUsuario(email: string){
    const url = `${this.baseUrl}/user/${email}`
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    return this.httpclient.delete<Usuario>(url, {headers:opcionHeader}); 
  }

  /**Método para editar los datos de un usuario */
  editarUsuario(email: string, usuario : Usuario){
    const url = `${this.baseUrl}/user/${email}`
    let token = localStorage.getItem('token');
    const opcionHeader = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    const body = usuario;
    return this.httpclient.put<Usuario>(url, body, {headers:opcionHeader});
  }

  /**Método para obtener un usuario por su email */
  obtenerUsuarioPorEmail(email: string){
    const url = `${this.baseUrl}/usuario/${email}`
    return this.httpclient.get<Usuario>(url);
  }

}
