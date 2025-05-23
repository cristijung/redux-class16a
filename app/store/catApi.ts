import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Cat {
    id: string;
    url: string;    
}

export const catsApi = createApi({
    reducerPath: 'catsApi',  //nome único que define o reducer gerado pela API -- API Slice
    baseQuery: fetchBaseQuery({ //função utilizada para realizar as requisições na API
        baseUrl: 'https://api.thecatapi.com/v1/',
    }),

    endpoints: (builder) => ({
        getAllCats: builder.query<Cat[], number | void>({
            query: (limit = 10) => ({ url: 'images/search', params: { limit}}), //a query (consulta a API) está sendo feita para o endpoint images/search
        }),
        //é possível inserir mais endpoints aqui
    }),
});

//hook personalizado que é gerado automaticamente pelo RTK Query
export const { useGetAllCatsQuery } = catsApi;

//este hook gerado automaticamente ele lida com:
// - dados retornados da API (data)
// - erro: já possui um objeto de erro se a consulta falhar
// - loading: booleano q informa se a consulta está em andamento
// - busca: booleano q informa se a consulta está buscando novos dados, qdo não houver dados no cache 