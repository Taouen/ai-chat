import Head from 'next/head';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';

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
        <form onSubmit={handleSubmit} className="flex">
          <textarea
            className="border rounded-lg border-black m-2 p-2 resize-none h-auto"
            value={request}
            onChange={handleChange}
          />
          <button className="border rounded-lg p-2 m-2" type="submit">
            Submit
          </button>
        </form>

        <div className="flex flex-col items-center w-full">
          {loading && <PulseLoader loading={loading} color="lightblue" />}
          {prevRequests.map((prompt, index) => {
            return (
              <ResponsePair prompt={prompt} response={aiResponses[index]} />
            );
          })}
        </div>
      </Layout>
    </>
  );
}
