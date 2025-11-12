export interface IUpdateProfileDTO {
  NomeUsuario?: string;
  Senha?: string;
  NovaSenha?: string;
}

export interface IUpdateProfileResponseDTO {
  IdUsuario: number;
  NomeUsuario: string;
  Role: string;
  mensagem: string;
}
