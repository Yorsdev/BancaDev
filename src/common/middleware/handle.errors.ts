import { Response } from 'express';
import { CustomError } from '../../domain/errors/custom.errors';

export const handleErrors = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
