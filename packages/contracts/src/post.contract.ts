import { initContract } from '@ts-rest/core';

const c = initContract();

export type PostEntity = {
  id: number;
  title: string;
  content: string | null;
  published: boolean | null;
  authorId: number | null;
};

export type FindManyPostQuery = {
  skip?: string;
  take?: string;
};

export type IdPathParams = {
  id: string;
};

export type CreatePostBody = {
  title: string;
  content?: string | null;
  published?: boolean | null;
  authorId?: number | null;
};

export type UpdatePostBody = Partial<CreatePostBody>;

export const postContract = c.router({
  findMany: {
    method: 'GET',
    path: '/posts',
    query: c.type<FindManyPostQuery>(),
    responses: {
      200: c.type<PostEntity[]>(),
    },
  },
  findOne: {
    method: 'GET',
    path: '/posts/:id',
    pathParams: c.type<IdPathParams>(),
    responses: {
      200: c.type<PostEntity>(),
    },
  },
  create: {
    method: 'POST',
    path: '/posts',
    body: c.type<CreatePostBody>(),
    responses: {
      201: c.type<PostEntity>(),
    },
  },
  update: {
    method: 'PATCH',
    path: '/posts/:id',
    pathParams: c.type<IdPathParams>(),
    body: c.type<UpdatePostBody>(),
    responses: {
      200: c.type<PostEntity>(),
    },
  },
  remove: {
    method: 'DELETE',
    path: '/posts/:id',
    pathParams: c.type<IdPathParams>(),
    responses: {
      200: c.type<PostEntity>(),
    },
  },
});
