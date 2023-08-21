import { IsNumber, IsString } from 'class-validator';

export class PlayerDto {

    @IsString()
    playerName: string;

    @IsNumber()
    age: number;

    @IsNumber()
    playerNumber: number;

    @IsString()
    position: string;

}
