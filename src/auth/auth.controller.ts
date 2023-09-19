import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateUserDto, UserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Body() dto: UserDto) {
    const data = await this.authService.registerUser(dto);
    return { message: 'User registered', data };
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get()
  findAllUsers(@Request() req: Request) {
    return this.authService.findAllUsers();
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const existingTeam = await this.authService.findUserById(id);
    return existingTeam;
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async disableUser(@Param('id') id: number) {
    return this.authService.disableUser(id);
  }

  /* 
    @UseGuards(AuthGuard)
    @Get('check-token')
    checkToken(@Request() req: Request): LoginResponse {
  
      const user = req['user'] as User;
  
      return {
        user,
        token: this.authService.getJwtToken({ id: user._id })
      }
  
    }
   */
}
