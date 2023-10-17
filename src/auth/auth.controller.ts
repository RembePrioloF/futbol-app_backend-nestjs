import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateUserDto, UserDto, UserRole } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Ruta para obtener los valores del enum
  @Get('/roles')
  async getUserRoles() {
    return await Object.values(UserRole);
  }

  @Post('/register')
  async registerUser(@Body() dto: UserDto) {
    const data = await this.authService.registerUser(dto);
    return { message: 'User registered', data };
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get()
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const existingTeam = await this.authService.findUserById(id);
    return existingTeam;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Patch('/restore/:id')
  async restoreUser(@Res() response, @Param('id') id: string) {
    try {
      const userData = await this.authService.restoreUser(id);
      return response.status(HttpStatus.OK).json({
        message: 'User successfully restored', userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
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
