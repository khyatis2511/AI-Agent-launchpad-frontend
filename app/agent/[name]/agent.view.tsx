import { ChatObj } from "@/app/utils/types/type";
import React, { Dispatch, FC, SetStateAction } from "react";


interface AgentViewProps {
  headerName: string, 
  chatDetails: ChatObj[], 
  message: string, 
  setMessage:  Dispatch<SetStateAction<string>>, 
  handleExecute: () => Promise<void> 
}
const AgentView : FC<AgentViewProps> = ({headerName, chatDetails, message, setMessage, handleExecute }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="bg-blue-600 text-white text-center py-4 font-bold text-xl">
        {headerName}
      </header>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {chatDetails?.map((chat) => (
          <React.Fragment  key={chat?.id}>
           <div className={`flex justify-end mb-2`}>
              <div className={`max-w-xs p-3 rounded-lg text-white bg-blue-600 text-right`}>
                {chat.message}
              </div>
            </div>
            <div className={`flex justify-start mb-2`}>
              <div className={`max-w-xs p-3 rounded-lg text-white bg-gray-800 text-left`}>
                {chat.AIResponse}
              </div>
            </div>
          </React.Fragment>
          
        ))}
      </div>

      {chatDetails?.length <= 0 || !chatDetails && <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 p-2 border rounded-md focus:outline-blue-500 resize-none"
            rows={2}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleExecute}
          >
            Send
          </button>
        </div>
      </div>}
    </div>
  )
}

export default AgentView;