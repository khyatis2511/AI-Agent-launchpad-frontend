'use client';
import { getAgentChatHistory } from "@/app/lib/redux/slices/chatHistorySlice";
import { AppDispatch, RootState } from "@/app/lib/redux/store";
import { formatDate } from "@/app/utils/helper";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SidebarProps {
    children: ReactNode
}

interface ChatHistoryObject {
  id: string
  name: string,
  taskType: string
  createdAt: string
}

const Sidebar : FC<SidebarProps> = ({children}) => {
  const router = useRouter();
  const chatHistory = useSelector((state: RootState) => state.chatHistory);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(getAgentChatHistory());
  }, [])
    
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chat History</h2>
        {chatHistory?.data?.length === 0 ? (
          <p className="text-gray-400">No chats yet</p>
        ) : (
          <ul className="space-y-4">
            {chatHistory?.data?.map((chat: ChatHistoryObject) => (
              <li 
                key={chat.id} 
                className="p-2 bg-gray-700 rounded-lg" 
                onClick={() => router.push(`/agent/${chat.taskType.replaceAll('_', '-')}?id=${chat.id}`)}
              >
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-300">{formatDate(chat.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </aside>
      {children}
    </div>
  )
}

export default Sidebar;