import { IsNumber, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateInventoryDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  reserved: number;

  @IsOptional()
  @IsNumber()
  sold: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  warehouse: string;
}

export class UpdateInventoryDto {
  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  reserved: number;

  @IsOptional()
  @IsNumber()
  sold: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  warehouse: string;
}
