import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/persistence/repositories/bankAccount.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string): Promise<boolean> {
    const isBankAccountOwner = await this.bankAccountsRepository.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!isBankAccountOwner) {
      return false;
    }

    return true;
  }
}
