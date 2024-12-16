import { IsOptional, IsString, IsInt } from 'class-validator';

export class AtualizarUsuarioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsInt()
  idade?: number;

  @IsOptional()
  @IsString()
  email?: string;
}
