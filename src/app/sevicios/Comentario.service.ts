import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../interfaces/comentario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService implements OnInit {


  constructor(private httpclient: HttpClient) { }

    private baseUrl: string = environment.baseUrl;


    /**Método para enviar un comentario al administrador realizado por un usuario */
    enviarComentarioUsuario(comentario : Comentario){
        const url = `${this.baseUrl}/comenusuario`;
        const body = comentario;
        return this.httpclient.post<Comentario>(url, body);
    }


    /**Método para mostrar los comentarios que ya han sido publicados */
    mostrarComentariosPublicados(){
        const url = `${this.baseUrl}/comenpublicados`;
        return this.httpclient.get<Comentario[]>(url);
    }
  

  
 

  ngOnInit(): void {
  }


}
