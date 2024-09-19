export interface Response<T> {
  exito: boolean;
  mensaje: string;
  data: T;
}

export interface ResponseWithError<T, U> {
  exito: boolean;
  mensaje: string;
  data: T;
  error: U;
}
