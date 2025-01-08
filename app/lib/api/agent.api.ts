/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAPI } from "../../utils/helper"

export const lunchAgentAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/agent/',
    method: 'POST',
    data: payload
  })
}

export const agentChatResponseAPI = async (agentId:string, payload: { message: string }): Promise<any> => {
    return await axiosAPI({
      url: `/agent/${agentId}/chat`,
      method: 'POST',
      data: payload
    })
  }

export const  getAgentChatHistoryAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: `/agent/`,
    method: 'GET',
  })
}

export const  getAgentChatAPI = async (agentId: string): Promise<any> => {
  return await axiosAPI({
    url: `/agent/${agentId}/chat`,
    method: 'GET',
  })
}

