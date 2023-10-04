import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from './roles.enum';

export class UserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;

}
