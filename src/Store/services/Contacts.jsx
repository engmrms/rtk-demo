import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, body }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data: body });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contact',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  // baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000' }),
  //   keepUnusedDataFor:30, by default, data will remain in the cache for 60 seconds after the subscriber reference count hits zero.
  refetchOnMountOrArgChange: true,
  tagTypes: ['contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      //query: () => '/contacts',
      query: () => ({ url: '/contacts', method: 'GET' }),
      //providesTags: ['contacts'],
      providesTags: result =>
        result ? [...result.map(({ id }) => ({ type: 'contacts', id })), { type: 'contacts', id: 'List' }] : [{ type: 'contacts', id: 'List' }],
    }),
    getContactById: builder.query({
      //   query: id => `/contacts/${id}`,
      query: id => ({ url: `/contacts/${id}`, method: 'GET' }),
      //providesTags: ['contacts'],
      providesTags: (result, error, id) => [{ type: 'contacts', id }],
    }),
    addContact: builder.mutation({
      query: body => ({
        url: '/contacts',
        method: 'POST',
        body,
      }),
      //   invalidatesTags: ['contacts'],
      invalidatesTags: [{ type: 'contacts', id: 'List' }],
    }),
    editContact: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      //invalidatesTags: ['contacts'],
      invalidatesTags: (result, error, { id }) => [{ type: 'contacts', id }],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      //   invalidatesTags: ['contacts'],
      invalidatesTags: (result, error, id) => [{ type: 'contacts', id }],
    }),
  }),
});

export const { useGetContactsQuery, useGetContactByIdQuery, useAddContactMutation, useEditContactMutation, useDeleteContactMutation } = contactsApi;
