import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Usuario } from "../interfaces/usuario.interfaces";
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class EmailValidacionServices implements AsyncValidator {
  
    constructor(private httpclient: HttpClient) { }
  
    private baseUrl: string = environment.baseUrl;

  /**Petición para comprobar la existencia de un email*/
  comprobarEmail(email:string){
    const url = `${this.baseUrl}/usuario/${email}`;
    return this.httpclient.get<Usuario>(url);
  }


  /**Método para comprobar la existencia de un email que pasamos por el formulario de registro */
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;
    return this.comprobarEmail(email)
    .pipe(
      map (resp => {
        
        if(resp.email != null){
          return {enUso: true};
        }else{
          return {enUso: false};
        }
      }),
       catchError((er) => {
         return of(null);
       })
    );
    }
  


  
  }