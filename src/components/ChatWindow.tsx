import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  message: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

export function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4 bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <Avatar>
                <AvatarImage src="/globe.svg" alt="Bot" />
                <AvatarFallback>Bot</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
            </div>
            {msg.sender === "user" && (
              <Avatar>
                <AvatarImage src="/user.svg" alt="User" /> {/* Assuming a user avatar */}
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
