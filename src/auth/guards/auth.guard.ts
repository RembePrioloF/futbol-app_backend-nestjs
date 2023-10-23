/* import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('There is no bearer token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, { secret: process.env.JWT_SEED }
      );
      const user = await this.authService.findUserById(payload.id);
      if (!user) throw new UnauthorizedException('User does not exists');
      if (!user.isActive) throw new UnauthorizedException('User is not active');
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtén el usuario de la solicitud (puedes ajustar esto según tu implementación)

    // Verifica si el usuario es el creador del torneo
    const tournamentId = request.params.id; // Ajusta cómo obtienes el ID del torneo
    if (this.isTournamentOwner(user, tournamentId)) {
      return true;
    }

    return false;
  }

  private isTournamentOwner(user: User, tournamentId: string): boolean {
    // Implementa tu lógica para verificar si el usuario es el creador del torneo.
    // Puedes consultar la base de datos y comparar el ID del usuario con el creador del torneo.
    // Si el usuario es el creador, devuelve true; de lo contrario, devuelve false.
    return user.tournaments.some(tournament => tournament.tournamId === tournamentId);
  }
}
