// src/api/huggingface.ts
export const queryHuggingFace = async (prompt: string): Promise<string> => {
  const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
    }),
  });

  if (!response.ok) {
    throw new Error('HuggingFace API error');
  }

  const result = await response.json();

  return result?.[0]?.generated_text || 'Sorry, I couldn’t generate a response.';
};
