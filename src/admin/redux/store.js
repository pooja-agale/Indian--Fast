// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/Auth';
import { api } from './apis/Userapis';
import { Categoriesapi } from './apis/Categoriesapi';
import { Vendorsapi } from './apis/Vendorsapi';
import { Bannerapi } from './apis/Bannerapi';
import { DeliveryPartnerapi } from './apis/DeliveryPartnerapi';
import authReducer from './appSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    [Categoriesapi.reducerPath]: Categoriesapi.reducer,
    [Vendorsapi.reducerPath]: Vendorsapi.reducer,
    [Bannerapi.reducerPath]: Bannerapi.reducer,
    [DeliveryPartnerapi.reducerPath]: DeliveryPartnerapi.reducer,
    auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      api.middleware,
      Categoriesapi.middleware,
      Vendorsapi.middleware,
      Bannerapi.middleware,
      DeliveryPartnerapi.middleware,
    ),
});
