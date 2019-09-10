import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioUtil } from '../utils/usuario.utils';

@Injectable()
export class ManagerGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        return UsuarioUtil.isInRole('manager');
    }
}