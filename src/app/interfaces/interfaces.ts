export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface TokenResp {
  ok: boolean;
  token: string;
}

export interface RespuestaToken {
  ok: boolean;
  usuario: Usuario;
}

export interface RespuestaPosted {
  ok: boolean;
  post: Post;
}

export interface Post {
  mensaje?: string;
  _id?: string;
  imgs?: any[];
  coords?: string | null;
  usuario?: Usuario;
  created?: string;
  posicion?: boolean;
  __v?: number;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}
