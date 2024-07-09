import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PersistenceModule } from './shared/persistence/persistence.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [UsersModule, PersistenceModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
