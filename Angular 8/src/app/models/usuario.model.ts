export class Usuario {
    constructor(
        public usuario?: string,
        public nome?: string,
        public email?: string,
        public imagem?: string,
        public roles?: string[],
        public token?: string,
    ) { }
}