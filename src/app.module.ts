import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { VariationsModule } from './variations/variations.module';
import { ChildcategoriesModule } from './childcategories/childcategories.module';
import { CategoriesModule } from './categories/categories.module';
import { OptionsModule } from './options/options.module';
import { StoresModule } from './stores/stores.module';
import { CartsModule } from './carts/carts.module';
import * as autopup from 'mongoose-autopopulate';
import * as mp from 'mongoose-paginate-v2';
import { MulterModule } from '@nestjs/platform-express';
import { PromocodesModule } from './promocodes/promocodes.module';
import { StoresettingsModule } from './storesettings/storesettings.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    UsersModule,
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
    ProductsModule,
    StoresModule,
    OptionsModule,
    CategoriesModule,
    ChildcategoriesModule,
    VariationsModule,
    CartsModule,
    PromocodesModule,
    StoresettingsModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
