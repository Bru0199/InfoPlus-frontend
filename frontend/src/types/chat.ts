/** Messages from API or optimistic client rows. */
export type ChatMessage = {
  id?: string;
  role: "user" | "assistant" | "system";
  content: unknown;
  conversationId?: string;
  createdAt?: string;
};
