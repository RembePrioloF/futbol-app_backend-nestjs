import { Body, Controller, Delete, Get, HttpStatus, OnModuleInit, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { PlayerService } from 'src/players/player.service';
import { transporter } from '../../config/mailer';
import { MatchEvent, PlayerInMatchDto } from './dto';
import { PlayerInMatchService } from './player_in_match.service';

@Controller('player_in_match')
export class PlayerInMatchController implements OnModuleInit {

  playerEmailsList: string[] = [];

  constructor(
    private readonly playerInMatchService: PlayerInMatchService,
    private readonly playerService: PlayerService,
  ) { }

  async onModuleInit() {
    try {
      const players = await this.playerService.findAllPlayer();
      if (players) {
        this.playerEmailsList = players.map(player => player.email);
      }
    } catch (error) {
      console.error('Error al cargar la lista de jugadores:', error);
    }
  }

  @Post('/sendEmail')
  async sendEmail(@Body() data: { htmlTemplate: string }, @Res() response) {
    const playerEmails = this.playerEmailsList;
    if (playerEmails.length === 0) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'No se encontraron direcciones de correo electrónico'
      });
    }
    const { htmlTemplate } = data;
    try {
      await new Promise((resolve, reject) => {
        transporter.sendMail({
          from: '"TournApp" <rembepriolo@gmail.com>',
          to: 'rembepriolo@hotmail.com', //to: playerEmails.join(','), 
          subject: 'Notificación Estadísticas del Jugador ✔',
          text: 'Las Estadísticas del Jugador',
          html: htmlTemplate
        }, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
      return response.status(HttpStatus.OK).json({
        message: 'Los correos se han enviado exitosamente'
      });
    } catch (error) {
      console.error(error);
      if (error.code === 'EENVELOPE') {
        return response.status(HttpStatus.REQUEST_TIMEOUT).json({
          message: 'No hay destinatarios definidos'
        });
      }
      if (error.code === 'ESOCKET') {
        return response.status(HttpStatus.REQUEST_TIMEOUT).json({
          message: 'Tiempo de espera agotado al conectar al servidor de correo'
        });
      } else {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error enviando los correos electrónicos'
        });
      }
    }
  }

  // Ruta para obtener los valores del enum
  @Get('/match_event')
  getMatchEvent() {
    return Object.values(MatchEvent);
  }

  @Post()
  createPlayerInMatch(@Body() playerInMatchDto: PlayerInMatchDto) {
    return this.playerInMatchService.createPlayerInMatch(playerInMatchDto);
  }

  @Get()
  findAllPlayerInMatch() {
    return this.playerInMatchService.findAllPlayerInMatch();
  }

  @Get('/:id')
  findPlayerInMatchById(@Param('id') id: string) {
    return this.playerInMatchService.findPlayerInMatchById(id);
  }

  @Put('/:id')
  updatePlayerInMatch(@Param('id') id: string, @Body() playerInMatchDto: PlayerInMatchDto) {
    return this.playerInMatchService.updatePlayerInMatch(id, playerInMatchDto);
  }

  @Delete('/:id')
  deletePlayerInMatch(@Param('id') id: string) {
    return this.playerInMatchService.deletePlayerInMatch(id);
  }

  @Patch('/restore/:id')
  restoreMatchent(@Param('id') id: string) {
    return this.playerInMatchService.restoreMatchent(id);
  }

}
