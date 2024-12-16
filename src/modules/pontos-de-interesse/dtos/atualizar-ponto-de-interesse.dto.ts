import { IsOptional, IsNumber, IsString } from 'class-validator';

export class AtualizarPontoDeInteresseDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  categoria?: number;
}
