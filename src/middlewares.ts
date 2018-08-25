import { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';

export function ErrorHandler(
  err: HttpError, 
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.send(`
    Error ${err.status}
    ${err.message}
  `);
}

export function Create404(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const error404_code: number = 404;

  next(createError(error404_code));
}
