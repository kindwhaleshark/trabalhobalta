import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from './models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  public authenticate(data: any): any {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }

  public obterCategorias(): any {
    return this.http.get(`${this.url}/produtos/categorias`);
  }

  public obterProdutos(): any {
    return this.http.get(`${this.url}/produtos`);
  }

  public obterProdutoPorCodigo(codigo: string): any {
    return this.http.get(`${this.url}/produtos/${codigo}`);
  }

  public salvarProduto(produto: Produto): any {
    return this.http.post(`${this.url}/produtos/${produto.codigo}`, produto);
  }

  public editarProduto(produto: Produto): any {
    return this.http.put(`${this.url}/produtos/${produto.codigo}`, produto);
  }

  public excluirProduto(produto: Produto): any {
    return this.http.delete(`${this.url}/produtos/${produto.codigo}`);
  }
}
