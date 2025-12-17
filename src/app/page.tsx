"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ChatWindow } from "@/components/ChatWindow"; // Import ChatWindow

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  message: string;
}

export default function Home() {
  const [generatedJson, setGeneratedJson] = useState<string>(
    `{\n  "example": "json",\n  "data": "will be displayed here"\n}`
  );
  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSelectTemplate = (template: any) => {
    setGeneratedJson(JSON.stringify(template, null, 2));
    // Add a bot message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: "bot", message: "Template selecionado. O JSON foi atualizado." },
    ]);
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      message: chatInput,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setChatInput("");

    // Simulate a bot response (can be replaced with actual LLM interaction)
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        sender: "bot",
        message: `Entendido: "${chatInput}". Gerando JSON... (Este é um bot de demonstração).`,
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    // Optionally, provide feedback to the user that the JSON has been copied.
    alert("JSON copiado para a área de transferência!");
  };

  return (
    <div className="flex min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      {/* Left Panel - Chat Input and Template Selection */}
      <div className="w-1/3 flex flex-col gap-4 p-4 border-r border-gray-200 dark:border-gray-700">
        <Card>
          <CardHeader>
            <CardTitle>SAP Integration Co-Pilot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Type your request or select a template to generate SAP integration JSONs.
            </p>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <ChatWindow messages={messages} />

        {/* Chat Input */}
        <div className="flex flex-col gap-2 mt-auto">
          <Textarea
            placeholder="Type your message here..."
            className="min-h-[60px]"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send Message</Button>
        </div>

        {/* Template Selection */}
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-[calc(100vh-800px)] w-full rounded-md border p-4"> {/* Adjusted height */}
              <TemplateSelector onSelectTemplate={handleSelectTemplate} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - JSON Display and Sandbox */}
      <div className="w-2/3 flex flex-col gap-4 p-4">
        <Card className="flex-grow">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Generated JSON</CardTitle>
            <Button variant="outline" size="sm" onClick={copyJsonToClipboard}>
              Copy JSON
            </Button>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-[calc(100vh-120px)] w-full rounded-md border p-4 bg-gray-50 dark:bg-gray-800 font-mono text-sm">
              <Textarea
                value={generatedJson}
                onChange={(e) => setGeneratedJson(e.target.value)}
                className="w-full h-full font-mono text-sm border-none bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



