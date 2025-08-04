import { Controller, Get, Request, Post, UseGuards, BadRequestException, Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { RolesService } from './role/role.service';
import { Role } from './role/role.entity';  
 

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,  
    private readonly rolesService: RolesService,
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
    const { id, username, rol } = req.user;
    return {
  
      id,
      username,
      rol:   rol.name  
    };
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


  async register(@Body() body: { 
    username: string; 
    password: string; 
    rol: number; 
    name: string; 
    lastname: string; 
    email: string; 
    suscription: string 
  }) {
    const { username, password, rol, name, lastname, email, suscription } = body;
   
    // Validación básica
    if (!username || !password || !rol || !email || !suscription || !lastname || !name) {
      throw new BadRequestException('Username, password, rol y email son requeridos.');
    }
  
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('El correo electrónico no es válido.');
    }
  
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('El nombre de usuario ya existe.');
    }
  
    // Verificar si el rol existe
    const roleEntity = await this.rolesService.findById(rol);
    if (!roleEntity) {
      throw new BadRequestException(`El rol con ID ${rol} no existe.`);
    } 
  
    // Crear usuario
    const newUser = await this.usersService.create(username, password, roleEntity, name, lastname, email, suscription);
  
    return {
      message: 'Usuario creado exitosamente.',
      user: {
        id: newUser.id,
        username: newUser.username,
        rol: newUser.rol,
        email: newUser.email
      },
    };
  }



  @UseGuards(JwtAuthGuard)
  @Get('roles') // genera la ruta /roles-from-app
  async getRolesFromApp(): Promise<Role[]> {
    return this.rolesService.findAll();
  }


}
