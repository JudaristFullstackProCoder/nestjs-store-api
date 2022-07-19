import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as autopup from 'mongoose-autopopulate';
import * as mp from 'mongoose-paginate-v2';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { OptionsModule } from './options/options.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { CartsModule } from './carts/carts.module';
import { VariationsModule } from './variations/variations.module';
import { PromocodesModule } from './promocodes/promocodes.module';
import { FamiliesModule } from './families/families.module';
import { CategoriesModule } from './categories/categories.module';
import { LikesModule } from './likes/likes.module';
import { ViewsModule } from './views/views.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SessionService } from './session/session.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-store-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
      connectionFactory: (connection) => {
        connection.plugin(autopup);
        connection.plugin(mp);
        return connection;
      },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    AdminsModule,
    OptionsModule,
    ProductsModule,
    StoresModule,
    CartsModule,
    VariationsModule,
    PromocodesModule,
    FamiliesModule,
    CategoriesModule,
    LikesModule,
    ViewsModule,
    AuthModule,
    MailerModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SessionService],
})
export class AppModule {}
