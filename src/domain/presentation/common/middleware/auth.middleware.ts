import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../../config/jwt.adapter';
import { User, UserRole } from '../../../../data';

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.token; //se cambió let por const
    if (!token) {
      return res.status(401).json({ message: 'token no provided' });
    }
    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) return res.status(401).json({ message: 'invalid token' });

      (req as any).sessionUser = user;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  static restrictTo = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const sessionUser = (req as any).sessionUser;
      if (!sessionUser) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      if (!roles.includes(sessionUser.rol)) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to access this route' });
      }
      next();
    };
  };
  static allowAdminOrSelf(req: Request, res: Response, next: NextFunction) {
    const sessionUser = (req as any).sessionUser;
    const { id } = req.params;

    if (sessionUser.rol === UserRole.ADMIN || sessionUser.id === id) {
      return next();
    }
    return res
      .status(403)
      .json({ message: 'You are not authorized to modify this user' });
  }
}
