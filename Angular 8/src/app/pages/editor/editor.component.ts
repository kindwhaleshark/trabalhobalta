import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { DataService } from 'src/app/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { Resultado } from 'src/app/models/resultado.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public form: FormGroup;
  public categorias: Categoria[] = [];
  public ehEdicao = false;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private service: DataService
  ) { 
    this.form = this.fb.group({
      codigo: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.CodigoValidator,
          Validators.minLength(6)
        ])
      ],
      titulo: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.required
        ])
      ],
      preco: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.required
        ])
      ],
      descricao: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required
        ])
      ],
      quantidade: [
        '',
        Validators.required
      ],
      categoria: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit() {
    let parametro = this.activeRoute.snapshot.queryParams.codigo;

    if (parametro) {
      this.service.obterProdutoPorCodigo(parametro)
      .subscribe(
        (res: Resultado) => {
          this.form.setValue(res.dados);
          this.ehEdicao = true;
        }, (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.form.reset();
      this.ehEdicao = false;
    }

    this.carregarCategorias();
  }

  public carregarCategorias(): void {
    this.service
      .obterCategorias()
      .subscribe(
        (res: Resultado) => {
          this.categorias = res.dados;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  public voltar(): void {
    this.route.navigate(['']);
  }

  public submit(): void {
    this.form.disable();
    if (this.ehEdicao) {
      this.editar();
    } else {
      this.salvar();
    }
  }

  public salvar(): void {
    this.service
      .salvarProduto(this.form.value)
      .subscribe(
        (res: Resultado) => {
          this.tratarResultado(res);
        },
        (err: any) => {
          this.tratarResultadoErro(err);
        },
        () => {
          this.form.enable();
        }
      );
  }

  public editar(): void {
    this.service
      .editarProduto(this.form.value)
      .subscribe(
        (res: Resultado) => {
          this.tratarResultado(res);
        },
        (err: any) => {
          this.tratarResultadoErro(err);
        },
        () => {
          this.form.enable();
        }
      );
  }

  private tratarResultado(res: Resultado): void {
    this.form.enable();
    console.log(res);
    alert(res.mensagem);
    this.form.reset();
    this.ehEdicao = false;
  }

  private tratarResultadoErro(erro: any): void {
    this.form.enable();
    alert(erro);
  }

}
