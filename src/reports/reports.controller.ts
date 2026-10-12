import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { CurrentUser } from '../users/decorators/current-user.decorators.js';
import { User } from '../users/user.entity.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { ReportDto } from './dto/report.dto.js';
import { ApproveReportDto } from './dto/approve-report.dto.js';
import { AdminGuard } from '../guards/admin.guard.js';
import { GetEstimateDto } from './dto/get-estimate.dto.js';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/')
  //   @UseGuards(AdminGuard)
  getEstimates(@Query() query: GetEstimateDto) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    const report = await this.reportsService.create(body, user);

    console.log('-----------REPORT---------', report);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    const approval = await this.reportsService.changeApproval(
      id,
      body.approved,
    );

    console.log('-------------approveReport-------------', approval);
    return approval;
  }
}
