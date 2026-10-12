import { Transform } from 'class-transformer';
import {
  IsNumber,
  Min,
  Max,
  IsString,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class GetEstimateDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2026)
  year: number;

  @Transform(({ value }) => +value)
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => +value)
  @IsLatitude()
  lat: number;
}
