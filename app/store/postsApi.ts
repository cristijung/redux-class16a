
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}


export const postsApi = createApi({
  reducerPath: 'postsApi', // caminho único para este reducer no store ...
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Post'], //  tipos de tags para invalidação de cache
  endpoints: (builder) => ({
    // endpoint para buscar uma lista de posts
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      // keepUnusedDataFor: é usado p manter os dados não utilizados no cache por 30 segundos.
      // depois desse tempo, se não houver mais componentes usando esses dados,
      // eles serão removidos do cache. o padrão é  sempre 60 segundos.
      keepUnusedDataFor: 30,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    // outro endpoint para buscar um único post por ID
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      // aqui podemos ter um tempo de cache diferente para posts individuais
      keepUnusedDataFor: 60,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;