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
}
