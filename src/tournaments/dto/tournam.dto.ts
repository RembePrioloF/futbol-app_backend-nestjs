import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class TournamDto {

    @IsString()
    tournamName: string;

    @IsDate()
    @Type(() => Date)
    competitionDays: Date;

    @IsString()
    locations: string;

    @IsString()
    league: string;

    /* @IsNotEmpty()
    //@IsMongoId()
    readonly team: string; */

}
