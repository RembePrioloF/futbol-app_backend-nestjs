import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team extends Document {

    _id?: string;

    @Prop({ unique: true, required: true })
    playerName: string;

    @Prop({ required: true })
    teamLogo: string;

    @Prop({ unique: true, required: true })
    playerNumber: string;

    @Prop({ unique: true, required: true })
    playerPosition: string;

}

export const TeamSchema = SchemaFactory.createForClass(Team);
