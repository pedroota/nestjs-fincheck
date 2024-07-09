import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/persistence/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    const [isBankAccountOwner, isCategoryOwner, isTransactionOwner] =
      await Promise.all([
        bankAccountId &&
          this.validateBankAccountOwnershipService.validate(
            userId,
            bankAccountId,
          ),
        categoryId &&
          this.validateCategoryOwnershipService.validate(userId, categoryId),
        transactionId &&
          this.validateTransactionOwnershipService.validate(
            userId,
            transactionId,
          ),
      ]);

    if (!isBankAccountOwner && bankAccountId) {
      throw new NotFoundException('Bank account not found');
    }

    if (!isCategoryOwner && categoryId) {
      throw new NotFoundException('Category not found');
    }

    if (!isTransactionOwner && transactionId) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId: createTransactionDto.bankAccountId,
      categoryId: createTransactionDto.categoryId,
    });

    const transaction = await this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId: createTransactionDto.bankAccountId,
        categoryId: createTransactionDto.categoryId,
        name: createTransactionDto.name,
        value: createTransactionDto.value,
        date: createTransactionDto.date,
        type: createTransactionDto.type,
      },
    });

    return transaction;
  }

  findAllByUserId(userId: string) {
    const transactions = this.transactionsRepository.findMany({
      where: {
        userId,
      },
    });

    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId: updateTransactionDto.bankAccountId,
      categoryId: updateTransactionDto.categoryId,
      transactionId,
    });

    const updateTransaction = await this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId: updateTransactionDto.bankAccountId,
        categoryId: updateTransactionDto.categoryId,
        date: updateTransactionDto.date,
        name: updateTransactionDto.name,
        type: updateTransactionDto.type,
        value: updateTransactionDto.value,
      },
    });

    return updateTransaction;
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    });

    await this.transactionsRepository.delete({
      where: {
        id: transactionId,
      },
    });

    return null;
  }
}
