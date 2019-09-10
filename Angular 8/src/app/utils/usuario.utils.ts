import { Usuario } from 'src/app/models/usuario.model';

export class UsuarioUtil {
    private static chaveUsuario: string = 'app.usuario';

    static salvar(usuario: Usuario) {
        localStorage.setItem(this.chaveUsuario, JSON.stringify(usuario));
    }

    static obter(): Usuario {
        const dados = localStorage.getItem(this.chaveUsuario);
        if (dados)
            return JSON.parse(dados);
        else
            return null;
    }

    static limpar() {
        localStorage.removeItem(this.chaveUsuario);
    }

    public static isInRole(role: string): boolean {
        const usuario = this.obter();

        if (!usuario)
            return false;

        if (!usuario.roles || usuario.roles.length == 0)
            return false;

        return usuario.roles.includes(role);
    }
}