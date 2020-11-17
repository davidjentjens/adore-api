import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';

import CreateCategoryService from './CreateCategoryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;

let createCategory: CreateCategoryService;

describe('CreateBusiness', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createCategory = new CreateCategoryService(
      fakeUsersRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to create a new category', async () => {
    const user = await fakeUsersRepository.create({
      name: 'admin',
      email: 'admin@example.com',
      password: '123456',
    });

    const category = await createCategory.execute({
      user_id: user.id,
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category with a non-existant user', async () => {
    expect(
      createCategory.execute({
        user_id: '123',
        name: 'Categoria Teste',
        image_url: 'http://image-url.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new category if user is not admin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'not-admin',
      email: 'not-admin@example.com',
      password: '123456',
    });

    expect(
      createCategory.execute({
        user_id: user.id,
        name: 'Categoria Teste',
        image_url: 'http://image-url.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
