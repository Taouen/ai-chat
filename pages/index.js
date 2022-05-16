import Head from 'next/head';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { v4 as uuid4 } from 'uuid';

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

    requests.unshift(request);
    setPrevRequests(requests); // add current request to the array of previous requests

    setRequest(''); // Reset input field to blank
    setLoading(true);
    getResponse(request);
  };

  const getResponse = async (request) => {
    const data = { request };
    const responses = [...aiResponses];
    const response = await fetch('/api/openAiResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((info) => {
        responses.unshift(info[0].text);
        console.log(info);
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
        <form
          onSubmit={handleSubmit}
          className="flex fixed bottom-0 w-full max-w-screen-sm bg-white"
        >
          <input
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

        <div className="flex flex-col items-center w-full max-w-screen-sm ">
          {loading && <PulseLoader loading={loading} color="lightblue" />}
          {prevRequests.map((prompt, index) => {
            return (
              <ResponsePair
                key={prompt}
                prompt={prompt}
                response={aiResponses[index]}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
}
