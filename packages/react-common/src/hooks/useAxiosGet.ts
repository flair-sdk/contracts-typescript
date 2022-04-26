import axios, { AxiosRequestHeaders } from 'axios';
import { useCallback, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';

import { useCancel } from './useCancel';

type Config = {
  url: string;
  params?: any;
  headers?: AxiosRequestHeaders;
  timeout?: number;
  enabled?: boolean;
};

export const useAxiosGet = <T>({
  url,
  params,
  headers,
  timeout,
  enabled = true,
}: Config) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState(false);

  const cancelQuery = useCancel();
  const sendRequest = useCallback(async () => {
    let didCancel = false;
    let source = axios.CancelToken.source();
    cancelQuery(() => {
      didCancel = true;
      source.cancel('Cancelling in cleanup');
    });
    try {
      setLoading(true);
      setError(undefined);
      const response = await axios.get<T>(url, {
        params,
        cancelToken: source.token,
        timeout: timeout,
        headers,
      });
      if (!didCancel) {
        setResponse(response.data);
        setLoading(false);
      }
      return response;
    } catch (error: any) {
      if (!didCancel) {
        setError(error);
        setLoading(false);
        if (axios.isCancel(error)) {
          console.log(`request cancelled: ${error.message}`);
        } else {
          console.log(`another error happened: ${error.message}`);
        }
      }
    }
  }, [cancelQuery, url, params, timeout, headers]);

  useDeepCompareEffect(() => {
    if (enabled) {
      sendRequest();
    }
  }, [url, params, timeout]);

  return { data: response, isLoading, error, sendRequest } as const;
};
