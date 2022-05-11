import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const response = await openai.createCompletion('text-curie-001', {
    prompt: req.body.request,
    temperature: 0.7,
    max_tokens: 50,
  });

  res.status(200).json(response.data.choices);
}
