import type { TLoadingTargets } from '@/models/types/shared.type';

import { AUTH_PAGES } from '@/constants/route-pages.const';
import { axiosInstance } from '@/libs/axios/config';
import { EResponseStatus } from '@/models/enums/auth.enum';
import { TFailureResponse, TSuccessResponse } from '@/models/types/auth.type';
import { useAuthStore } from '@/stores/auth.store';
import { useLoadingStore } from '@/stores/loading.store';
import { showToast } from '@/utils/shared.util';
import {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';
import store2 from 'store2';

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type TMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

const request = async <D = unknown, M = unknown>(
  method: TMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  try {
    if (loadingTarget) useLoadingStore.getState().showLoading();

    const response: AxiosResponse<TSuccessResponse<D, M>> = await axiosInstance[
      method
    ](url, data, config);

    if (toastMessage) showToast(toastMessage);

    const result: TSuccessResponse<D, M> = {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success,
      statusCode: response.status,
    };
    return result;
  } catch (error) {
    let errorCode = ERROR_CODES.ERR_500;
    let errorData = null;
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (isAxiosError<TFailureResponse>(error)) {
      errorCode = error.response?.data.error.code || errorCode;
      errorData = error.response?.data.error.data || errorData;
      errorMessage = error.response?.data.error.message || errorMessage;
      statusCode = error.response?.status || statusCode;
    }

    const result: TFailureResponse = {
      error: {
        code: errorCode,
        data: errorData,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
      statusCode,
    };
    return Promise.reject(result);
  } finally {
    useLoadingStore.getState().hideLoading();
  }
};

export const del = async <T = unknown, M = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<T, M>(
    'delete',
    url,
    undefined,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const get = async <T = unknown, M = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<T, M>(
    'get',
    url,
    undefined,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const handleUnauthorizedError = async (
  error: AxiosError<TFailureResponse>,
) => {
  const isTokenRefreshed = await useAuthStore.getState().refreshToken();

  if (!isTokenRefreshed) {
    useAuthStore.getState().logout();
    window.location.href = AUTH_PAGES.LOGIN;
    return;
  }

  const accessToken = store2.get(STORAGE_KEYS.ACCESS_TOKEN);
  const originalRequest = error.config as IAxiosRequestConfig;

  if (originalRequest) {
    if (!originalRequest.headers) originalRequest.headers = {};
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

    if (!originalRequest._retry) {
      originalRequest._retry = true;
      await axiosInstance(originalRequest);
    }
  }
};

export const patch = async <T = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<T, M>(
    'patch',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const post = async <T = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<T, M>(
    'post',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const put = async <T = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<T, M>(
    'put',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};
