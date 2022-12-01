import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export type HttpResponse = AxiosResponse
export type HttpRequestConfig = AxiosRequestConfig
export interface HttpError extends AxiosError {
	isCancelRequest?: boolean
	config?: object
	response?: object
}
export type HttpOption = {
	url: string
	method: string
	data?: object
	params?: object
	intercept?: boolean
  silence?: boolean
  errorSilence?: boolean
}

export interface HttpAxiosRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void;
  beforeResponseCallback?: (response: HttpResponse) => void;
  errorSilence?: boolean
}

export interface HttpAxiosResponse extends AxiosResponse {
  config: HttpAxiosRequestConfig;
}
export interface HttpAxiosError extends AxiosError {
  isCancelRequest?: boolean;
  config: HttpAxiosRequestConfig,
  response: HttpAxiosResponse
}
