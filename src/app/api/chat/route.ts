import { GoogleGenerativeAI } from '@google/generative-ai';
import { templates } from '@/lib/templates';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key não configurada" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Usando gemini-2.5-flash conforme lista de modelos disponíveis
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Preparar histórico
    const lastMessage = messages[messages.length - 1];
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const systemPrompt = `Você é o SAP Integration Co-Pilot.
    TEMPLATES DISPONÍVEIS: ${JSON.stringify(templates)}
    DIRETRIZES: 
    1. Retorne JSON válido se solicitado.
    2. Evite markdown de código com crases triplas.
    3. Seja técnico.`;

    // Injeção de System Prompt simples
    if (history.length > 0 && history[0].role === 'user') {
      history[0].parts[0].text = systemPrompt + "\n\n" + history[0].parts[0].text;
    } else {
      lastMessage.content = systemPrompt + "\n\n" + lastMessage.content;
    }

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessageStream(lastMessage.content);

    // Transformar o stream do Gemini em ReadableStream da Web API
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error("ERRO API:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
