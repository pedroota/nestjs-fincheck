import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bankAccount.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';

@Global()
@Module({
  providers: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    PrismaService,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class PersistenceModule {}
