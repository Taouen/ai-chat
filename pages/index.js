import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';

export default function Home() {
  const [request, setRequest] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleChange = (e) => {
    setRequest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getResponse(request);
  };

  const getResponse = async (request) => {
    const data = { request };
    const response = await fetch('/api/openAiResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((info) => {
        console.log(info);
        setAiResponse(info[0].text);
      });
  };

  return (
    <>
      <Head>
        <title>Ask an AI</title>
        <meta
          name="description"
          content="Get answers to your questions from an AI"
        />
      </Head>
      <Layout>
        <form onSubmit={handleSubmit}>
          <input
            className="border border-black m-2 p-2"
            type="text"
            value={request}
            onChange={handleChange}
          />
          <button className="border border-blue-400 p-2 m-2" type="submit">
            Submit
          </button>
        </form>

        <div>{aiResponse}</div>
      </Layout>
    </>
  );
}
