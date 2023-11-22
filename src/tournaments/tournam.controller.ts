import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TournamDto } from './dto';
import { Leagues } from './dto/leagues.enum';
import { Locations } from './dto/locations.enum';
import { TournamService } from './tournam.service';

@Controller('tournam')
export class TournamController {
  constructor(private readonly tournamService: TournamService) { }

  // Ruta para obtener los valores del enum
  @Get('/leagues')
  getLeague() {
    return Object.values(Leagues);
  }
  @Get('/locations')
  getLocation() {
    return Object.values(Locations);
  }

  @Post()
  createTournam(@Body() tournamDto: TournamDto) {
    return this.tournamService.createTournam(tournamDto);
  }

  @Get()
  findAllTournam() {
    return this.tournamService.findAllTournam();
  }

  @Get('/:id')
  findTournamById(@Param('id') id: string) {
    return this.tournamService.findTournamById(id);
  }

  @Get('match/:id')
  async findTournamMatchById(@Param('id') id: string) {
    const matchsQuarter = [{
      id: '0', field: 'partido 1', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }, {
      id: '1', field: 'partido 2', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }, {
      id: '2', field: 'partido 3', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }, {
      id: '3', field: 'partido 4', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }]
    const matchsSemi = [{
      id: '4', field: 'partido 5', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }, {
      id: '5', field: 'partido 6', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }]
    const matchsFinal = [{
      id: '6', field: 'partido 7', openEvent: 0, teams: [
        { teamId: '1', name: 'Equipo sin definir', point: 0 },
        { teamId: '2', name: 'Equipo sin definir', point: 0 }
      ]
    }]

    const existingTournam = await this.tournamService.findTournamById(id);

    if (existingTournam.matchs.slice(0, 4).length <= 4) {
      let object: any = {}
      let idx2 = 0
      existingTournam.teams.slice(0, 8).map((item, index) => {
        if (index % 2 === 0) {
          object = {
            teamId: item.teamId,
            name: item.name,
            point: 0
          }
        } else {
          const teams = [
            { teamId: object.teamId, name: object.name, point: 0 },
            { teamId: item.teamId, name: item.name, point: 0 }
          ]
          const matchQuarter = {
            id: idx2.toString(), 
            field: `Partido ${idx2 + 1}`,
            openEvent: 0,
            teams
          }
          matchsQuarter[idx2] = matchQuarter
          object = {}
          idx2 += 1
        }

      })
    }

    existingTournam.matchs.slice(0, 4).map((item, index) => {
      const goalLocalTeam = existingTournam.playerInMatches.filter(pm => pm.player.team.teamId === item.localTeam.teamId && pm.matchEvent === 'gol marcado').reduce((sum, a) => sum + a.point, 0)
      const goalVisitingTeam = existingTournam.playerInMatches.filter(pm => pm.player.team.teamId === item.visitingTeam.teamId && pm.matchEvent === 'gol marcado').reduce((sum, a) => sum + a.point, 0)

      const teams = [
        { teamId: item.localTeam.teamId, name: item.localTeam.name, point: goalLocalTeam },
        { teamId: item.visitingTeam.teamId, name: item.visitingTeam.name, point: goalVisitingTeam }
      ]
      matchsQuarter[index]['teams'] = teams
      matchsQuarter[index]['openEvent'] = 1
      matchsQuarter[index]['id'] = item.id
    })

    existingTournam.matchs.slice(4, 6).map((item, index) => {
      const goalLocalTeam = existingTournam.playerInMatches.filter(pm => pm.player.team.teamId === item.localTeam.teamId && pm.matchEvent === 'gol marcado').reduce((sum, a) => sum + a.point, 0)
      const goalVisitingTeam = existingTournam.playerInMatches.filter(pm => pm.player.team.teamId === item.visitingTeam.teamId && pm.matchEvent === 'gol marcado').reduce((sum, a) => sum + a.point, 0)

      const teams = [
        { teamId: item.localTeam.teamId, name: item.localTeam.name, point: goalLocalTeam },
        { teamId: item.visitingTeam.teamId, name: item.visitingTeam.name, point: goalVisitingTeam }
      ]
      matchsSemi[index]['teams'] = teams
      matchsSemi[index]['openEvent'] = 1
      matchsSemi[index]['id'] = item.id
    })

    existingTournam.matchs.slice(6).map((item, index) => {
      const goalLocalTeam = existingTournam.playerInMatches.filter(pm => pm.player.team.teamId === item.localTeam.teamId && pm.matchEvent === 'gol marcado').reduce((sum, a) => sum + a.point, 0)
      const goalVisitingTeam = existingTournam.playerInMatches.filter(pm => pm.player.team.teamId === item.visitingTeam.teamId && pm.matchEvent === 'gol marcado').reduce((sum, a) => sum + a.point, 0)

      const teams = [
        { teamId: item.localTeam.teamId, name: item.localTeam.name, point: goalLocalTeam },
        { teamId: item.visitingTeam.teamId, name: item.visitingTeam.name, point: goalVisitingTeam }
      ]
      matchsFinal[index]['teams'] = teams
      matchsFinal[index]['openEvent'] = 1
      matchsFinal[index]['id'] = item.id
    })

    console.log(existingTournam);
    return {
      matchQuarter: matchsQuarter,
      matchSemi: matchsSemi,
      matchFinal: matchsFinal
    }
  }

  @Put('/:id')
  updateTournam(@Param('id') id: string, @Body() tournamDto: TournamDto) {
    return this.tournamService.updateTournam(id, tournamDto);
  }

  @Delete('/:id')
  deleteTournam(@Param('id') id: string) {
    return this.tournamService.deleteTournam(id);
  }

  @Patch('/restore/:id')
  restoreTournament(@Param('id') id: string) {
    return this.tournamService.restoreTournament(id);
  }

}
