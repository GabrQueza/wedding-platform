import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const adminSecret = this.configService.get<string>('ADMIN_SECRET');
    const providedSecret = request.headers['x-admin-secret'];

    if (!adminSecret) {
      throw new UnauthorizedException('Configuração de ADMIN_SECRET ausente no servidor.');
    }

    if (!providedSecret || providedSecret !== adminSecret) {
      throw new UnauthorizedException('Acesso negado: Secret inválido ou ausente.');
    }

    return true;
  }
}
