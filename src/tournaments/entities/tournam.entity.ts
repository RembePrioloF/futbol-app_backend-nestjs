import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Team } from './team.entity';

@Schema()
export class Tournam extends Document {

    _id?: string;

    @Prop({ unique: true, required: true })
    tournamName: string;

    @Prop({ required: true })
    competitionDays: Date;

    @Prop({ required: true })
    locations: string;

    @Prop({ required: true })
    league: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    /* @Prop({ type: Types.ObjectId, ref: Team.name })
    team: Team | Types.ObjectId; */

}

export const TournamSchema = SchemaFactory.createForClass(Tournam);
