import { IsString } from 'class-validator';

export class ParticipationDto {

    @IsString()
    registrationDate: Date;

    @IsString()
    referee: string;

    @IsString()
    teamId: string;

    @IsString()
    tournamId: string;

}