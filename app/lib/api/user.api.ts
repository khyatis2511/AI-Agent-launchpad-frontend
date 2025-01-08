/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAPI } from "../../utils/helper"

export const loginAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/user/login',
    method: 'POST',
    data: payload
  })
}

export const registerAPI = async (payload: any): Promise<any> => {
    return await axiosAPI({
      url: '/user/register',
      method: 'POST',
      data: payload
    })
  }

export const  whoAmI = async (): Promise<any> => {
  return await axiosAPI({
    url: `/user/who-am-i`,
    method: 'GET',
    // data: payload
  })
}

export const logoutAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: '/user/logout',
    method: 'POST',
  })
}

