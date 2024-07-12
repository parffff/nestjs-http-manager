import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable } from '@nestjs/common'
import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios'
import { GetRequestOpt, HeadRequestOpt, PostRequestOpt } from './types/request-options'
import { catchError, firstValueFrom, map, Observable, switchMap } from 'rxjs'
import { Stream } from 'stream'

// Класс-обертка над http запросами на сторонние API
@Injectable()
export class HttpManagerService {
  constructor(private readonly httpService: HttpService) {}

  /** HEAD-запрос к ресурсу для получения заголовков */
  async head(path: string, options: HeadRequestOpt = {}): Promise<Record<string, any>> {
    const { headers } = await firstValueFrom(
      this.httpService.head(path, { headers: options.headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.message, error.status)
        })
      )
    )
    return headers
  }

  /**
   * Отправка GET запросов. Дженерик:
   * T - тип, который ожидается в ответе,
   */
  async get<T>(path: string, options: GetRequestOpt = {}): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.get<T>(path, { headers: options.headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status)
        })
      )
    )
    return data
  }

  /** GET-запрос с потоковой передачей ответа */
  getStreaming(path: string, options: GetRequestOpt = {}): Observable<Buffer> {
    return this.httpService
      .get(path, { headers: options.headers, responseType: 'stream' })
      .pipe(
        switchMap((response: AxiosResponse<Stream>) => {
          const stream = response.data
          return new Observable<Buffer>((observer) => {
            stream.on('data', (chunk: Buffer) => observer.next(chunk))
            stream.on('end', () => observer.complete())
            stream.on('error', (err) => observer.error(err))
          })
        }),
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status)
        })
      )
  }

  /**
   * Отправка POST запросов. Дженерик:
   * T - тип, который ожидается в ответе,
   * D - тип, который ожидается в запросе
   */
  async post<T, D>(path: string, options: PostRequestOpt<D> = {}): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.post<T>(path, options.data, { headers: options.headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status)
        })
      )
    )
    return data
  }
}
