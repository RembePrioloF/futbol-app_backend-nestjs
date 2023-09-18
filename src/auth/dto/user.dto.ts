import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from './roles.enum';

export class UserDto {

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @MinLength(6)
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsOptional()
    role: UserRole;

}
