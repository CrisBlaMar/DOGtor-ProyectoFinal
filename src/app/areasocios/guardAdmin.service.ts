import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable, catchError, of } from 'rxjs';
import { UsuarioService } from './usuarios-services/usuario.service';
import Swal from 'sweetalert2';

@Injectable()
export class GuardAdmin implements CanActivate{

    constructor(private usuarioservice : UsuarioService, private router:Router){};

    

    /**
     * Método con el que controlamos el acceso del administrador en la página web
     * donde estos podrán solo acceder a ciertas partes y los usuarios normales o no logueados no podrán
     * @param route 
     * @param state 
     * @returns 
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable <boolean> | any {
        if(localStorage.getItem('rol') == "ADMIN"){
            let acceso = false;
            return this.usuarioservice.validarToken()
            .pipe(
                map(resp =>{
                    
                        acceso = true;
                        return acceso; 
                    }
                ),
                catchError (err =>{
                    Swal.fire({
                        title: 'Error', 
                        text: 'No puede acceder. Debe iniciar sesión como Administrador', 
                        icon: 'error',
                        color: '#3d3d1b',
                        background: '#FAE4CF',
                        showConfirmButton: false,});
                    this.router.navigateByUrl('');
                    acceso = false;
                    return of(acceso)
                    
                })
            )
            }
        
    }


}