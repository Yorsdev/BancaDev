import { Response } from 'express';
import { CustomError } from '../../domain/errors/custom.errors';

export const handleErrors = (res: Response, error: unknown) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
