export interface Categoria {
    IdCategoria: number;
    Nome: string;
    Descricao: string | null;
    Cor: string | null;
    Icone: string | null;
    Ativa: boolean;
    Inclusao: Date;
    Atualizacao: Date;
}
