import { IsOptional, IsEmail, IsString, MinLength, IsDate } from 'class-validator';

export class RegisterUserDto {

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsOptional()
    roles: string[];

    @IsDate()
    @IsOptional()
    createAt: Date;

    @IsDate()
    @IsOptional()
    updateAt: Date;

}
