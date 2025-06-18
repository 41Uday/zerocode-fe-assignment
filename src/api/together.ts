// src/api/together.ts
export const queryTogetherAI = async (prompt: string): Promise<string> => {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/Mistral-7B-Instruct-v0.1', // or try: meta-llama/Llama-3-8B-Instruct
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('❌ Together AI API error');
  }

  const result = await response.json();
  return result?.choices?.[0]?.message?.content || '⚠️ No response generated.';
};
