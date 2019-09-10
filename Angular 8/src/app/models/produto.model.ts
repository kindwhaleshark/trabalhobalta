export class Produto {
    constructor(
        public codigo?: string,
        public titulo?: string,
        public preco?: number,
        public descricao?: string,
        public quantidade?: number,
        public categoria?: string
    ) { }
}