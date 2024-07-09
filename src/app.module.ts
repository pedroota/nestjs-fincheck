import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PersistenceModule } from './shared/persistence/persistence.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, PersistenceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
