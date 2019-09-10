import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resultado } from 'src/app/models/resultado.model';
import { UsuarioUtil } from 'src/app/utils/usuario.utils';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  public produtos: Produto[];
  public produto: Produto;
  
  constructor(
    private service: DataService,
    private rotaAtiva: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.service.obterProdutos()
      .subscribe(
        (res: Resultado) => {
          this.produtos = res.dados;
        }
      );
  }

  public editar(produto: Produto): void {
    this.route.navigate(['/editor'], {
        relativeTo: this.rotaAtiva,
        queryParams: {codigo: produto.codigo}
      });
  }

  public excluir(produto: Produto): void {
    produto.codigo = "12-abc"

    this.service.excluirProduto(produto)
      .subscribe(
        (res: Resultado) => {
          let index = this.produtos.indexOf(produto);
          this.produtos.splice(index, 1);
        }, (err: any) => {
          console.log(err);
        }
      );
  }

  public novoProduto(): void {
    this.route.navigate(['/editor'], {relativeTo: this.rotaAtiva});
  }

  public ehUsuarioValido(): boolean {
    return UsuarioUtil.isInRole('manager');
  }

}
