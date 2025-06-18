import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User, UserRole } from '../../../data';

export class AuthMiddleware {
  static async protect(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req?.cookies?.token;
    if (!token) {
      res.status(401).json({ message: 'token not provided' });
      return;
    }

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
      }

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        res.status(401).json({ message: 'invalid token' });
        return;
      }

      (req as any).user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: 'internal server error' });
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
