import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/persistence/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string) {
    const user = await this.usersRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
