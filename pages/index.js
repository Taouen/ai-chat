import Head from 'next/head';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import Layout from '../components/Layout';
import ResponsePair from '../components/ResponsePair';

export default function Home() {
  const [request, setRequest] = useState('');
  const [prevRequests, setPrevRequests] = useState([]);
  const [aiResponses, setAiResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRequest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requests = [...prevRequests];
    const id = uuid();

    const prompt = {
      id: id,
      text: request,
    };

    requests.unshift(prompt);
    setPrevRequests(requests); // add current request to the array of previous requests

    setRequest(''); // Reset input field to blank
    setLoading(true);
    getResponse(request, id);
  };

  const getResponse = async (request, id) => {
    const data = { request };
    const responses = [...aiResponses];
    fetch('/api/openAiResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((info) => {
        const reply = {
          id: id,
          text: info[0].text,
        };
        responses.unshift(reply);
        setAiResponses(responses);
        setLoading(false);
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
        {/* Messages container */}
        <div className="flex w-full h-16 p-2 bg-gray-100 border-b border-gray-300 justify-center items-center text-xl">
          AI
        </div>

        <div className="flex px-4 flex-col-reverse grow w-full max-w-screen-sm overflow-scroll scrollbar-hide">
          {prevRequests.map((prompt, index) => {
            const reply = aiResponses.filter((obj) => obj.id === prompt.id)[0];
            return (
              <ResponsePair
                key={prompt.id}
                prompt={prompt.text}
                response={reply ? reply.text : null}
                loading={loading}
              />
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-screen-sm bg-white"
        >
          <input
            aria-label="Enter propmt"
            className="border rounded-lg border-black m-2 p-2 resize-none w-4/5 h-12 focus:outline-none focus:ring focus:border-blue-500 active:border-blue-500"
            value={request}
            onChange={handleChange}
          />
          <button
            className="border rounded-lg p-2 m-2 w-1/5 bg-blue-500 text-white"
            type="submit"
          >
            Send
          </button>
        </form>
      </Layout>
    </>
  );
}
