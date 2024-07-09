import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bankAccount.repositories';

@Global()
@Module({
  providers: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    PrismaService,
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository],
})
export class PersistenceModule {}
