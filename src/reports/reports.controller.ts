import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { CurrentUser } from '../users/decorators/current-user.decorators.js';
import { User } from '../users/user.entity.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { ReportDto } from './dto/report.dto.js';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    const report = await this.reportsService.create(body, user);

    console.log('-----------REPORT---------', report);
  }
}
