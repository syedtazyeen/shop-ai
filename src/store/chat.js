import {
  useSyncExternalStore,
  createContext,
  useContext,
  useMemo,
} from "react";
import { createStore } from "./index";

// Types of actions for reducer
export const ACTIONS = {
  ADD_QUESTION: "ADD_QUESTION",
  ADD_ANSWER: "ADD_ANSWER",
  CURSOR_POSITION: "CURSOR_POSITION",
  CLEAR_CHAT: "CLEAR_CHAT",
  SELECT_PRODUCT: "SELECT_PRODUCT",
};

// Types of senders for messages
export const SENDER = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
};

export const SUGGESTIONS_LIMIT = 4; // Limits for suggestions
export const MESSAGES_LIMIT = 16; // Limits for messages

/**
 * Reducer function to manage the state
 * @param {Object} state - The current state
 * @param {Object} action - The action to perform
 * @returns {Object} - The new state
 */
export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_QUESTION:
      const newQuestion = {
        id: Date.now(),
        ...action.payload,
        timestamp: Date.now(),
      };
      return {
        ...state,
        isLoading: true,
        count: state.count + 1,
        messages: [...state.messages, newQuestion],
      };
    case ACTIONS.ADD_ANSWER:
      const newAnswer = {
        id: Date.now(),
        ...action.payload,
        timestamp: Date.now(),
      };
      const suggestionsCount = state.messages.filter(
        (message) => message.sender === SENDER.ASSISTANT
      ).length;
      const messagesCount = state.messages.length;
      return {
        ...state,
        isLoading: false,
        count: state.count + 1,
        hasExceeded:
          suggestionsCount >= SUGGESTIONS_LIMIT ||
          messagesCount >= MESSAGES_LIMIT,
        messages: [...state.messages, newAnswer],
      };
    case ACTIONS.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case ACTIONS.CURSOR_POSITION:
      return {
        ...state,
        cursorPosition: action.payload,
      };
    case ACTIONS.CLEAR_CHAT:
      return {
        ...state,
        messages: [],
        count: 0,
        cursorPosition: 0,
        isLoading: false,
        hasExceeded: false,
      };
    default:
      return state;
  }
}

const ChatContext = createContext(null);

/**
 * Provider for the chat context to store the messages
 * @param {{ children: React.ReactNode }} props
 */
export function ChatProvider({ children }) {
  const store = useMemo(
    () =>
      createStore(
        {
          count: 0,
          cursorPosition: 0,
          messages: [],
          isLoading: false,
          hasExceeded: false,
          selectedProduct: null,
        },
        reducer
      ),
    []
  );
  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>;
}

export function useChatSelector(selector) {
  const store = useContext(ChatContext);
  if (!store)
    throw new Error("useChatSelector must be used inside ChatProvider");

  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState())
  );
}

export function useChatDispatch() {
  const store = useContext(ChatContext);
  if (!store)
    throw new Error("useChatDispatch must be used inside ChatProvider");
  return store.dispatch;
}
