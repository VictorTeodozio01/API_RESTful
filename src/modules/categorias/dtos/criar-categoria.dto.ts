import { IsString, IsOptional } from 'class-validator';

export class CriarCategoriaDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
