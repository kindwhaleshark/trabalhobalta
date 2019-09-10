import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioUtil } from '../utils/usuario.utils';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router) {
    }

    public canActivate(): boolean {
        const usuario = UsuarioUtil.obter();
        if (!usuario || !usuario.token) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}