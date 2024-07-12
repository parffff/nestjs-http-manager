import { Global, Module } from '@nestjs/common'
import { HttpManagerService } from './http-manager.service'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({ useFactory: () => ({ timeout: 5000, maxRedirects: 5 }) })
  ],
  providers: [HttpManagerService],
  exports: [HttpManagerService]
})
export class HttpManagerModule {}
