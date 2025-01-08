/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { agentChatResponseAPI, lunchAgentAPI } from '@/app/lib/api/agent.api';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AgentView from './agent.view';
import { formatHeaderName } from '@/app/utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { createSuccess, getAgentChat } from '@/app/lib/redux/slices/chatSlice';

const Agent: React.FC = () => {
  const params = useParams();
  const queryParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const chat = useSelector((state: RootState) => state.chat);
  const [message, setMessage] = useState<string>('');
  // const [chatDetails, setChatDetails] = useState<ChatObj[]>([]);
  const [agentId, setAgentId] = useState<string | null>(null)

  const handleExecute = async () => {
    try {
      if (!params?.name || !message) return;

      let agentResponse;

      if(!agentId) {
        const payload = {
          name : message,
          taskType : params?.name?.toString().replaceAll('-', '_')
        }
        agentResponse = await lunchAgentAPI(payload);
      }

      if((agentResponse.success && agentResponse?.data?.id) || agentId){
        const aiResponse = await agentChatResponseAPI(agentResponse?.data?.id, { message });
        if(aiResponse.success) {
          dispatch(createSuccess([aiResponse.data]));
        }
      } else {
        alert('Something went wrong, unable to lunch ai agent');
      }
      setMessage('');
    } catch (error: any) {
      console.log('[send error:]', error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const id = queryParams.get('id')
    setAgentId(id);
    if(id) {
      dispatch(getAgentChat(id));
    }
  }, [queryParams, dispatch]);

  return (
    <AgentView {...{
      headerName: formatHeaderName(params?.name?.toString()),
      chatDetails: chat?.data,
      message,
      setMessage,
      handleExecute
    }} />
  );
};

export default Agent;
