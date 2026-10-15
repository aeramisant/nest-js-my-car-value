import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity.js';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto.js';
import { User } from '../users/user.entity.js';
import { GetEstimateDto } from './dto/get-estimate.dto.js';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...reportDto, user });
    console.log('report CREATED: ----------> ', report);
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!report) {
      throw new NotFoundException('REPORT NOT FOUND!!!!!!!!!!');
    }
    console.log(
      '-------------------------REPORTS SERVICE CHANGE APPROVAL------------------',
      report,
    );

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    const estimate = await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('mileage - :mileage', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
    console.log('------------------CREATE_ESTIMATE--------------', estimate);
    return estimate;
  }
}
