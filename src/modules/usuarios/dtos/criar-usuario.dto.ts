import { IsString, IsInt, IsOptional,IsNotEmpty } from 'class-validator';

export class CriarUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsInt()
  idade: number;

  @IsString()
  @IsOptional()
  email?: string;
}
