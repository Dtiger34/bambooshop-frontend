import {
  IsString,
  IsOptional,
  IsNumber,
  IsMongoId,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsString()
  sku: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsString()
  sku: string;
}
