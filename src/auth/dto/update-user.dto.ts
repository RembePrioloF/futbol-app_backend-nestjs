import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    name: string;

    @MinLength(6)
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsOptional()
    role: string;

    @IsDate()
    @IsOptional()
    updatedAt: Date;

}
