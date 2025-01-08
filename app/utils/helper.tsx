/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { dateFormat } from './constants'
import dayjs from 'dayjs'

export const deepClone = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj))
}

let axiosInstance: AxiosInstance | null = null
export const API = (force = false): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance
  }
  console.log('process.env.APP_API_END_POINT : ', process.env.APP_API_END_POINT);
  axiosInstance = axios.create({ 
    baseURL: process.env.APP_API_END_POINT ? process.env.APP_API_END_POINT : 'http://localhost:3088/ai/v1',
    withCredentials: true
  })
  return axiosInstance
}

export const axiosAPI: (config: AxiosRequestConfig) => Promise<any> = async (config) => {
  try {
    const response = await API().request(config)
    return response?.data
  } catch (error: any) {
    console.log('[Initial Axios Error :]', error?.response?.data?.message)
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message || 'Bad response from server');
    } else {
      return error?.message || 'Bad response from server'
    }
  }
}

export const formatDate = (date: string): string => dayjs(new Date(date)).format(dateFormat)

export const formatHeaderName = (name: string | undefined) => {
  if (!name) return '';
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
