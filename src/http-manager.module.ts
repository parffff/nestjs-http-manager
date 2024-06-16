import { Module } from '@nestjs/common'
import { HttpManagerService } from './http-manager.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.registerAsync({ useFactory: () => ({ timeout: 500, maxRedirects: 5 }) })
  ],
  providers: [HttpManagerService],
  exports: [HttpManagerService]
})
export class HttpManagerModule {}
