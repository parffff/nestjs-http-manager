import { AxiosHeaders, AxiosRequestConfig } from 'axios'

/** Дополнительные опции GET запроса */
export type GetRequestOpt = {
  /** Необязательно. Заголовки запроса */
  headers?: AxiosHeaders
}

/** Дополнительные опции GET запроса */
export type HeadRequestOpt = {
  /** Необязательно. Заголовки запроса */
  headers?: AxiosHeaders
}

/** Дополнительные опции POST запроса */
export type PostRequestOpt<D> = {
  /** Необязательно. Тело запроса */
  data?: D
  /** Необязательно. Заголовки запроса */
  headers?: AxiosHeaders
}
