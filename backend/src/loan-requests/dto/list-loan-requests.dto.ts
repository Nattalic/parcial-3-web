import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class ListLoanRequestsDto {
  // TODO BACK-A: agregar las validaciones del filtro opcional indicado en el enunciado.
  // La conversión de la consulta a número ya está preparada.
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  toolId?: number;
}

