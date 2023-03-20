import { createContext, useContext,  useReducer} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();



export const ChatContextProvider = ({ children }) => {
    const {currentUser} = useContext(AuthContext);
    
    // we are using useRef hook to load friend list and combine user id
    // why we are using useRef hook = useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };  

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};