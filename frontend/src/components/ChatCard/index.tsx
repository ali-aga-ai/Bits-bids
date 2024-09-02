import ProfileChat from "@/Types/ProfileChat";
import * as React from "react";

/**
 * The props for the ChatCardProfile component.
 */
export interface IChatCardProfileProps {
  /**
   * The chat messages.
   */
  chat: ProfileChat["userMessages"][1];
  /**
   * The product associated with the chat.
   */
  product: ProfileChat["product"];
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The ID of the user.
   */
  userId: string;
}

/**
 * The ChatCardProfile component.
 */
export default function ChatCardProfile(props: IChatCardProfileProps) {
  const { chat, product, name, userId } = props;

  /**
   * Handles clicking on the chat card.
   */
  const handleChatClick = () => {
    window.location.href = `/chat/${product.productId}/${userId}`;
  };

  return (
    <div
      className="card rounded-lg border overflow-hidden min-w-max"
      onClick={handleChatClick}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
          <img
            src={`https://ucarecdn.com/${product.image}/`}
            alt="Product"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {chat && chat.length > 0 && chat[0].message}
          </p>
        </div>
        <div className="flex flex-col items-end">
          {product.productName}
        </div>
      </div>
    </div>
  );
}