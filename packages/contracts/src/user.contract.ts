import { initContract } from '@ts-rest/core';
import type { PostEntity } from './post.contract';

const c = initContract();

export type UserEntity = {
  id: number;
  email: string;
  name: string | null;
};

export type UserWithPostsEntity = UserEntity & {
  posts?: PostEntity[];
};

export type FindManyUserQuery = {
  skip?: string;
  take?: string;
};

export type FindOneUserQuery = {
  includePosts?: boolean;
};

export type IdPathParams = {
  id: string;
};

export type CreateUserBody = {
  email: string;
  name?: string | null;
};

export type UpdateUserBody = Partial<CreateUserBody>;

export const userContract = c.router({
  findMany: {
    method: 'GET',
    path: '/users',
    query: c.type<FindManyUserQuery>(),
    responses: {
      200: c.type<UserEntity[]>(),
    },
  },
  findOne: {
    method: 'GET',
    path: '/users/:id',
    pathParams: c.type<IdPathParams>(),
    query: c.type<FindOneUserQuery>(),
    responses: {
      200: c.type<UserWithPostsEntity>(),
    },
  },
  create: {
    method: 'POST',
    path: '/users',
    body: c.type<CreateUserBody>(),
    responses: {
      201: c.type<UserEntity>(),
    },
  },
  update: {
    method: 'PATCH',
    path: '/users/:id',
    pathParams: c.type<IdPathParams>(),
    body: c.type<UpdateUserBody>(),
    responses: {
      200: c.type<UserEntity>(),
    },
  },
  remove: {
    method: 'DELETE',
    path: '/users/:id',
    pathParams: c.type<IdPathParams>(),
    responses: {
      200: c.type<UserEntity>(),
    },
  },
});
