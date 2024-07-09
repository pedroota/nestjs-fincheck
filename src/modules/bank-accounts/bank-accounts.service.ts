import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/persistence/repositories/bankAccount.repositories';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  private async isBankAccountOwner(
    userId: string,
    bankAccountId: string,
  ): Promise<boolean> {
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

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = await this.bankAccountsRepository.create({
      data: {
        name: createBankAccountDto.name,
        initialBalance: createBankAccountDto.initialBalance,
        type: createBankAccountDto.type,
        color: createBankAccountDto.color,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return bankAccount;
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
      select: {
        initialBalance: true,
        name: true,
        type: true,
        color: true,
        userId: true,
        id: true,
      },
    });

    return bankAccounts;
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const isBankAccountOwner = await this.isBankAccountOwner(
      userId,
      bankAccountId,
    );

    if (!isBankAccountOwner) {
      throw new NotFoundException('Bank account not found');
    }

    const updateBankAccoun = await this.bankAccountsRepository.update({
      where: {
        id: bankAccountId,
      },
      data: {
        name: updateBankAccountDto.name,
        initialBalance: updateBankAccountDto.initialBalance,
        type: updateBankAccountDto.type,
        color: updateBankAccountDto.color,
      },
    });

    return updateBankAccoun;
  }

  async remove(userId: string, bankAccountId: string) {
    const isBankAccountOwner = await this.isBankAccountOwner(
      userId,
      bankAccountId,
    );

    if (!isBankAccountOwner) {
      throw new NotFoundException('Bank account not found');
    }

    await this.bankAccountsRepository.delete({
      where: {
        id: bankAccountId,
      },
    });

    return null;
  }
}
