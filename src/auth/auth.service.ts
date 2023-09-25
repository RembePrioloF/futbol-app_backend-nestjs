import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginDto, UpdateUserDto, UserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcryptjs.hashSync(password, saltRounds);
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async create(userDto: UserDto): Promise<User> {
    // Guarda el nuevo usuario en la base de datos
    return await this.userRepository.save(userDto);
  }

  async registerUser(registerUser: UserDto): Promise<User> {
    try {
      // Crea un nuevo usuario
      const createdUser = await this.create({
        ...registerUser,
        // Hashea la contraseña antes de crear el usuario
        password: await this.hashPassword(registerUser.password),
      });
      // Elimina la contraseña antes de devolver los datos del usuario
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      console.log(error);
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`The user with email ${registerUser.email} already exists!`, HttpStatus.BAD_REQUEST);
      }
      if (error?.code === 'WARN_DATA_TRUNCATED') {
        throw new HttpException(`The role #${registerUser.role} not exists!`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Not valid credentials');
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials');
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password; // Elimina la propiedad 'password'

    return {
      user: userWithoutPassword,
      token: this.getJwtToken({ id: user.id }),
    }
  }

  /* async validateUser(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  } */

  async findAllUsers(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find();

    if (!users || users.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findUserById(id: string): Promise<Partial<User> | undefined> {
    const user = await this.userRepository.findOne({ where: { id: id.toString() } });

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password; // Elimina la propiedad 'password'

    if (!user)
      throw new NotFoundException(`User #${id} not found`);

    return userWithoutPassword;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id.toString() } });
    if (!user) {
      throw new NotFoundException(`The User with ID:${id} not found`);
    }
    try {
      // Actualiza los campos del usuario según el DTO
      Object.assign(user, updateUserDto);
      // Encripta la contraseña antes de guardarla (si se proporcionó)
      if (updateUserDto.password) {
        user.password = await this.hashPassword(updateUserDto.password);
      }
      // Guarda la actualización en la base de datos
      const updatedUser = await this.userRepository.save(user);
      // Devuelve el usuario actualizado sin la contraseña
      const userWithout: User = { ...updatedUser };
      delete userWithout.password;
      delete userWithout.createdAt;
      return userWithout;
    } catch (error) {
      console.log(error);
      if (error?.code === 'WARN_DATA_TRUNCATED') {
        throw new HttpException(`The role:${updateUserDto.role} not exists!`, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async disableUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id.toString() } });
    if (!user)
      throw new NotFoundException(`User #${id} not found`);

    if (user.isActive === false)
      throw new NotFoundException(`User #${user.name} is already disabled`);

    user.isActive = false; // Cambia el estado isActive a false
    await this.userRepository.save(user); // Guarda la actualización en la base de datos

    return { message: `User #${user.name} disabled` };
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
