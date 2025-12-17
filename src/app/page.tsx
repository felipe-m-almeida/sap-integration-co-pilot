"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ChatWindow } from "@/components/ChatWindow";
// import { useChat } from "@ai-sdk/react"; // REMOVIDO para evitar erros

export default function Home() {
  const [generatedJson, setGeneratedJson] = useState<string>(
    `{\n  "example": "json",\n  "data": "will be displayed here"\n}`
  );
  
  // Estado manual do Chat
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Função manual de envio
  const handleManualSubmit = async () => {
    if (!input.trim()) return;
    if (isLoading) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Enviando mensagem para API...");
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro API: ${response.status}`);
      }

      // Leitura básica da resposta (assumindo texto/stream)
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botContent = "";
      
      // Adiciona mensagem vazia do bot para ir preenchendo
      const botMsgId = Date.now() + 1;
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: "" }]);

      while (true) {
        const { done, value } = await reader?.read() || {};
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        botContent += text;
        
        // Atualiza mensagem do bot em tempo real
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, content: botContent } : msg
        ));
      }

      console.log("Resposta completa:", botContent);

      // Processar JSON no final
      try {
        const jsonMatch = botContent.match(/```json\n([\s\S]*?)\n```/) || 
                          botContent.match(/```\n([\s\S]*?)\n```/);
        let possibleJson = jsonMatch ? jsonMatch[1] : botContent;
        // Limpar possíveis sujeiras antes/depois se não achou bloco de código
        if (!jsonMatch) {
             const firstBrace = possibleJson.indexOf('{');
             const lastBrace = possibleJson.lastIndexOf('}');
             if (firstBrace >= 0 && lastBrace >= 0) {
                 possibleJson = possibleJson.substring(firstBrace, lastBrace + 1);
             }
        }

        const parsed = JSON.parse(possibleJson);
        setGeneratedJson(JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.log("Nenhum JSON detectado na resposta.");
      }

    } catch (error: any) {
      console.error("Erro ao enviar:", error);
      setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: "Erro ao conectar com a IA: " + error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (template: any) => {
    const jsonString = JSON.stringify(template, null, 2);
    setGeneratedJson(jsonString);
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'system', // ou 'assistant' para aparecer visualmente
      content: `Template selecionado e carregado.`
    }]);
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    alert("JSON copiado para a área de transferência!");
  };

  // Mapear mensagens para o formato do ChatWindow
  const chatMessages = messages.map((m, index) => ({
    id: m.id || index,
    sender: m.role === 'user' ? 'user' : 'bot',
    message: m.content
  }));

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
              Peça um JSON de integração ou selecione um template.
            </p>
          </CardContent>
        </Card>

        {/* Chat Window */}
        {/* @ts-ignore */}
        <ChatWindow messages={chatMessages} />

        {/* Chat Input - NO FORM to avoid reloads */}
        <div className="flex flex-col gap-2 mt-auto">
          <Textarea
            placeholder="Ex: Crie um cliente industrial em SP..."
            className="min-h-[60px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleManualSubmit();
              }
            }}
          />
          <Button 
            onClick={handleManualSubmit} 
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </div>

        {/* Template Selection */}
        <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 min-h-0 overflow-hidden relative"> 
            <ScrollArea className="h-full w-full p-4">
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



