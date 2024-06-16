## Инструкция по эксплуатации

### Установка

```
yarn add nestjs-http-manager

// или

npm i nestjs-http-manager
```

### Интеграция с nestjs-модуляим

Для использования данной библиотеки в своем проекте, необходимо:

1. Импортировать HttpManagerModule в ваш модуль

```
@Module({
  imports: [
    ..., HttpManagerModule, ...
  ],
  controllers: [...],
  providers: [...],

})
```

2. Сделать инъекцию HttpManagerService в конструкторе вашего сервиса

```
constructor(private readonly httpManager: HttpManagerService) {}
```

Готово! Сервис может использоваться

## Выполнение запроса

GET-запрос

```
...
const res: YourType = await this.httpManager.get<YourType>(
'http://example.com', {headers: {'Authorization': 'Bearer ...'}}
)
...
```

Аналогично и для POST-запроса

```
...
const res: YourType = await this.httpManager.post<YourType>(
'http://example.com', {
	data: {key: value},
	headers: {'Authorization': 'Bearer ...'}
})
...
```

Можно также не передавать options и оставить только url
