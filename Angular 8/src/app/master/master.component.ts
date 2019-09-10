import { Component } from '@angular/core';
import { UsuarioUtil } from '../utils/usuario.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {

  constructor(
    private route: Router
  ) { }

  sair() {
    UsuarioUtil.limpar();
    this.route.navigate(['login']);
  }
}
