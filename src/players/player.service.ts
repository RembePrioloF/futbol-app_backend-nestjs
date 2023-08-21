import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDto } from './dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {

  constructor(
    @InjectModel(Player.name)
    private playerModel: Model<Player>,
  ) { }

  async createPlayer(playerDto: PlayerDto): Promise<Player> {

    try {
      const newPlayer = new this.playerModel(playerDto);
      return await newPlayer.save();
    } catch (error) {
      if (error.code === 11000) {
        if
          (error.keyValue.playerNumber) {
          throw new BadRequestException(`playerNumber ${playerDto.playerNumber} already exists!`);

        } else {
          (error.keyValue.position)
          throw new BadRequestException(` ${playerDto.position} already exists!`);
        }
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }

  }

  /* 
    async register(registerDto: RegisterUserDto): Promise<LoginResponse> {
      const user = await this.create(registerDto);
      return {
        user: user,
        token: this.getJwtToken({ id: user._id })
      }
    }
  
    async login(loginDto: LoginDto): Promise<LoginResponse> {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email });
  
      if (!user) {
        throw new UnauthorizedException('Not valid credentials');
      }
  
      if (!bcryptjs.compareSync(password, user.password)) {
        throw new UnauthorizedException('Not valid credentials');
      }
  
      const { password: _, ...rest } = user.toJSON();
  
      return {
        user: rest,
        token: this.getJwtToken({ id: user.id }),
      }
    }
  
    findAll(): Promise<User[]> {
      return this.userModel.find();
    }
  
    async findUserById(id: string) {
      const user = await this.userModel.findById(id);
      const { password, ...rest } = user.toJSON();
      return rest;
    }
  
    findOne(id: number) {
      return `This action returns a #${id} auth`;
    }
  
    update(id: number, updateAuthDto: UpdateAuthDto) {
      return `This action updates a #${id} auth`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} auth`;
    }
  
    getJwtToken(payload: JwtPayload) {
      const token = this.jwtService.sign(payload);
      return token;
    }
   */
}
