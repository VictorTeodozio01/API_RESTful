import { IsString, IsOptional } from 'class-validator';

export class AtualizarCategoriaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
