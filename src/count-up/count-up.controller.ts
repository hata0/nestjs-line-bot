import { Controller, Put, UseGuards } from '@nestjs/common';
import { LineAuthGuard } from 'src/auth/line-auth.guard';

@Controller('count-up')
@UseGuards(LineAuthGuard)
export class CountUpController {
  @Put('')
  putCountUp() {
    return 'hello auth';
  }
}
