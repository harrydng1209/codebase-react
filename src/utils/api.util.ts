import type { TLoadingTargets } from '@/models/types/shared.type';

import { apiConfig } from '@/configs/api.config';
import { AUTH_PAGES } from '@/constants/route-pages.const';
import { EResponseStatus } from '@/models/enums/auth.enum';
import { TFailureResponse, TSuccessResponse } from '@/models/types/auth.type';
import { authStore } from '@/stores/auth.store';
import { loadingStore } from '@/stores/loading.store';
import {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';

import { showToast } from './shared.util';
import { getLocalStorage } from './storage.util';

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
  const actions = loadingStore.getState().actions;

  try {
    if (loadingTarget) actions.showLoading();

    const response: AxiosResponse<TSuccessResponse<D, M>> = await apiConfig[
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
    actions.hideLoading();
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
  const { actions } = authStore.getState();
  const isTokenRefreshed = await actions.refreshToken();

  if (!isTokenRefreshed) {
    actions.logout();
    window.location.href = AUTH_PAGES.LOGIN;
    return;
  }

  const accessToken = getLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
  const originalRequest = error.config as IAxiosRequestConfig;

  if (originalRequest) {
    if (!originalRequest.headers) originalRequest.headers = {};
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

    if (!originalRequest._retry) {
      originalRequest._retry = true;
      await apiConfig(originalRequest);
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
