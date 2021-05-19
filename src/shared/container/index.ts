import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import BusinessRepository from '@modules/businesses/infra/typeorm/repositories/BusinessRepository';

import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';
import BusinessClientRepository from '@modules/businesses/infra/typeorm/repositories/BusinessClientRepository';

import ITierRepository from '@modules/businesses/repositories/ITierRepository';
import TierRepository from '@modules/businesses/infra/typeorm/repositories/TierRepository';

import ICategoriesRepository from '@modules/businesses/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/businesses/infra/typeorm/repositories/CategoriesRepository';

import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';
import BusinessPostsRepository from '@modules/businesses/infra/typeorm/repositories/BusinessPostRepository';

import ILikesRepository from '@modules/businesses/repositories/ILikesRepository';
import LikesRepository from '@modules/businesses/infra/typeorm/repositories/LikesRepository';

import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';
import PerksRepository from '@modules/businesses/infra/typeorm/repositories/PerksRepository';

import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';
import DeliveryRepository from '@modules/deliveries/infra/typeorm/repositories/DeliveryRepository';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import DeliveryInstanceRepository from '@modules/deliveries/infra/typeorm/repositories/DeliveryInstanceRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IBusinessRepository>(
  'BusinessRepository',
  BusinessRepository,
);

container.registerSingleton<IBusinessClientRepository>(
  'BusinessClientRepository',
  BusinessClientRepository,
);

container.registerSingleton<ITierRepository>('TierRepository', TierRepository);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IBusinessPostsRepository>(
  'BusinessPostsRepository',
  BusinessPostsRepository,
);

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  LikesRepository,
);

container.registerSingleton<IPerksRepository>(
  'PerksRepository',
  PerksRepository,
);

container.registerSingleton<IDeliveryRepository>(
  'DeliveryRepository',
  DeliveryRepository,
);

container.registerSingleton<IDeliveryInstanceRepository>(
  'DeliveryInstanceRepository',
  DeliveryInstanceRepository,
);
