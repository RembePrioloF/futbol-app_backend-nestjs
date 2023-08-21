import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Player {

    _id?: string;

    @Prop({ unique: true, required: true })
    playerNumber: number;

    @Prop({ required: true })
    playerName: string;

    @Prop({ required: true })
    age: number;

    @Prop({ unique: true, required: true })
    position: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const PlayerSchema = SchemaFactory.createForClass(Player);
