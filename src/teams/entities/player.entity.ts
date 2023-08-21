import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {

    _id?: string;

    @Prop({ unique: true, required: true })
    playerName: string;

    @Prop({ required: true })
    age: number;

    @Prop({ unique: true, required: true })
    playerNumber: number;

    @Prop({ unique: true, required: true })
    position: string;

}

export const PlayerSchema = SchemaFactory.createForClass(Player);
