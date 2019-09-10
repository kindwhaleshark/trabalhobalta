import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioUtil } from 'src/app/utils/usuario.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public form: FormGroup;
  
  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private route: Router
  ) { 
    this.form = this.fb.group({
      usuario: [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(120),
          Validators.required
        ])
      ],
      senha: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ])
      ]
    });
  }

  public entrar(): void {
    this.form.disable();
    
    this.service.authenticate(this.form.value)
      .subscribe(
        (res: Usuario) => {
          UsuarioUtil.salvar(res);
          this.route.navigate(['']);
        },
        () => {
          this.form.enable();
        },
        () => {
          this.form.enable();
        }
      );
  }

}
