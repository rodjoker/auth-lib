import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    userId: number;
    username: string;
    rol: {
      id: number;
      name: string;
    };
  };
}

