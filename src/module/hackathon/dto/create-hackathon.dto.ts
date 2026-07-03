import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsDate,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHackathonDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description?: string;

  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  startsAt: Date;

  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  endsAt: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
