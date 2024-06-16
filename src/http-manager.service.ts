import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { GetRequestOpt, PostRequestOpt } from './types/request-options'
import { catchError, firstValueFrom } from 'rxjs'

// Класс-обертка над http запросами на сторонние API
@Injectable()
export class HttpManagerService {
  constructor(private readonly httpService: HttpService) {}

  /* 
  Отправка POST запросов. Дженерик: 
  T - тип, который ожидается в ответе, 
  */
  async get<T>(path: string, options: GetRequestOpt = {}): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.get<T>(path, { headers: options.headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.message, error.status)
        })
      )
    )
    return data
  }

  /* 
  Отправка POST запросов. Дженерик: 
  T - тип, который ожидается в ответе, 
  D - тип, который ожидается в запросе
  */
  async post<T, D>(path: string, options: PostRequestOpt<D> = {}): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.post<T>(path, options.data, { headers: options.headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.message, error.status)
        })
      )
    )
    return data
  }
}
