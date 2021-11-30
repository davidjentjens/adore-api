import { Request, Response, NextFunction } from 'express';

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log(`${req.protocol} request from ${req.ip}: "${req.url}"`);

  return next();
}
