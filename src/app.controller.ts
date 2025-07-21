import { Controller, Get, Request, Post, UseGuards, BadRequestException, Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService, // 👈 esto es lo que faltaba
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello-world')
  getHello(@Request() req): string {
    return 'Hello World! Acceso permitido solo con JWT válido.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @Post('auth/register')
async register(@Body() body: { username: string; password: string; rol: string }) {
  const { username, password, rol } = body;
  if (!username || !password || !rol) {
    throw new BadRequestException('Username, password y rol son requeridos.');
  }

  const existingUser = await this.usersService.findByUsername(username);
  if (existingUser) {
    throw new BadRequestException('El nombre de usuario ya existe.');
  }

  const newUser = await this.usersService.create(username, password, rol);

  return {
    message: 'Usuario creado exitosamente.',
    user: {
      id: newUser.id,
      username: newUser.username,
      rol: newUser.rol,
    },
  };
}


}
