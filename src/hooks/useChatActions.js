import {
  useChatDispatch,
  useChatSelector,
  SUGGESTIONS_LIMIT,
  SENDER,
  ACTIONS,
} from "../store/chat";
import { generateContent } from "../api/suggestion";
import { getProducts } from "../api/product";

/**
 * Hook to handle chat actions
 * @returns {Object} - The hook object with sendMessage and clearChat functions
 */
export function useChatActions() {
  const dispatch = useChatDispatch();
  const messages = useChatSelector((state) => state.messages);

  /**
   * Send a message to the chat.
   * At first the message is added to the state and then try to generate a response.
   * @param {string} text - The text of the message
   */
  async function sendMessage(text) {
    dispatch({
      type: ACTIONS.ADD_QUESTION,
      payload: { sender: SENDER.USER, text },
    });

    // Set cursor to the new message index (after adding the question)
    const initialCursorPosition = messages.length;
    dispatch({
      type: ACTIONS.CURSOR_POSITION,
      payload: initialCursorPosition,
    });

    try {
      const { answer, suggestedProducts = [] } = await generateContent(
        text,
        messages,
        SUGGESTIONS_LIMIT
      );

      // get the product details from the data
      const suggestedProductIds = suggestedProducts.map(
        (product) => product.id
      );
      const productDetails = getProducts(suggestedProductIds)
        .map((product) => {
          const suggestedProduct = suggestedProducts.find(
            (p) => p.id === product.id
          );
          return {
            ...product,
            score: suggestedProduct?.matchScore,
            reason: suggestedProduct?.reason,
            details: suggestedProduct?.details,
          };
        })
        .filter((product) => product.reason && product.details);

      // if there are products but no valid products found, throw an error
      if (suggestedProducts.length > 0 && productDetails.length === 0) {
        throw new Error("No valid products found after validation.");
      }

      dispatch({
        type: ACTIONS.ADD_ANSWER,
        payload: {
          sender: SENDER.ASSISTANT,
          text: answer,
          products: productDetails,
        },
      });

      // Update cursor position to point to the last message (the assistant's answer)
      dispatch({
        type: ACTIONS.CURSOR_POSITION,
        payload: initialCursorPosition + 1,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: ACTIONS.ADD_ANSWER,
        payload: {
          sender: SENDER.SYSTEM,
          text: "Something went wrong! Please try again.",
        },
      });

      // Update cursor position to point to the last message (the error message)
      dispatch({
        type: ACTIONS.CURSOR_POSITION,
        payload: initialCursorPosition + 1,
      });
    }
  }

  /**
   * Clear the chat
   */
  function clearChat() {
    dispatch({ type: ACTIONS.CLEAR_CHAT });
  }

  return { sendMessage, clearChat };
}
