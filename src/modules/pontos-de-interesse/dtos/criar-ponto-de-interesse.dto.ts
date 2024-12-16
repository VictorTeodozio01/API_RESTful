import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CriarPontoDeInteresseDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  categoria: number; 
}
