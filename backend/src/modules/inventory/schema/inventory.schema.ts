import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 0 })
  reserved: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop()
  location: string;

  @Prop()
  warehouse: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
