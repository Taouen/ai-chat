import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: req.body.request }],
      model: 'gpt-3.5-turbo',
    });
    console.log(response.choices[0].message.content);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      error: `An error occurred: ${err}`,
    });
  }
}
