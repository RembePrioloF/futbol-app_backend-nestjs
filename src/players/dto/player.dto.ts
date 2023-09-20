import { IsNumber, IsString } from 'class-validator';

export class PlayerDto {

    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsNumber()
    playerNumber: number;

    @IsString()
    position: string;

}
