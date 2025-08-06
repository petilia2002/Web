import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5174/" }),
  tagTypes: ["Goods"],
  endpoints: (build) => ({
    getGoods: build.query({
      query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Goods", id })),
              { type: "Goods", id: "LIST" },
            ]
          : [{ type: "Goods", id: "LIST" }],
    }),

    getGood: build.query({
      query: (id) => `goods/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),

    addProduct: build.mutation({
      query: (body) => ({
        url: "goods",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Goods", id: "LIST" }],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `goods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Goods", id }],
    }),

    updateProduct: build.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `goods/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Goods", id }],
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useGetGoodQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = goodsApi;
