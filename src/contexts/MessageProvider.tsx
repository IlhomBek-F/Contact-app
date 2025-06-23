import { message } from "antd";
import { createContext, useContext, type ReactNode } from "react";

const MessageContext = createContext({})

type MessageProviderPropsType = {
    children: ReactNode
}

function MessageProvider({children}: MessageProviderPropsType) {
    const [messageApi, contextHolder] = message.useMessage();
    
    const callAsyncMessage = (loadingMessage: string, successMessage: string) => {
     return messageApi.loading(loadingMessage, 0, () => success(successMessage));
    }

    const success = (message: string) => {
        messageApi.success(message);
    }

    return <MessageContext.Provider value={{callAsyncMessage, success}}>
        <>
            {children}
            {contextHolder}
        </>
        
    </MessageContext.Provider>
}

const useMessageProvider = () => useContext(MessageContext)

export {useMessageProvider, MessageProvider}