import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, validateSync } from 'class-validator';

class Env {
  @IsString()
  @MinLength(50)
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @MinLength(50)
  @IsNotEmpty()
  databaseUrl: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
