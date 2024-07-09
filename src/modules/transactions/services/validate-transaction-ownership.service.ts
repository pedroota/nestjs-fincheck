import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/persistence/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async validate(userId: string, transactionId: string): Promise<boolean> {
    const isTransactionOwner = await this.transactionsRepository.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!isTransactionOwner) {
      return false;
    }

    return true;
  }
}
