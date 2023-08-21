import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Team {

    _id?: string;

    @Prop({ unique: true, required: true })
    teamName: string;

    @Prop({ required: true })
    teamLogo: string;

    /* @Prop({ type: [String], default: ['jugador 1', 22, 1, 'portero'] })
    player: string[]; */

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const TeamSchema = SchemaFactory.createForClass(Team);
