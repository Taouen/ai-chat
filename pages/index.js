import Head from 'next/head';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Layout from '../components/Layout';
import ResponsePair from '../components/ResponsePair';
import BasicMenu from '../components/Menu';

export default function Home() {
  const [request, setRequest] = useState(''); // curent value of input element
  const [prevRequests, setPrevRequests] = useState([]); // previous requests sent to AI
  const [aiResponses, setAiResponses] = useState([]); // previous responses from AI
  const [chatColor, setChatColor] = useState('#BFDBFE');
  const [aiName, setAiName] = useState('');

  useEffect(() => {
    const names = [
      'Ultron',
      'HAL 9000',
      'Agent Smith',
      'J.A.R.V.I.S.',
      'F.R.I.D.A.Y.',
      'Data',
      'Cortana',
      'GlaDOS',
      'Max Headroom',
      'Deep Thought',
      'Marvin the Paranoid Android',
      'Skynet',
    ];

    const getRandomName = () => {
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
    };
    setAiName(getRandomName());
  }, []);

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
          text: info.choices[0].message.content,
        };
        responses.unshift(reply);
        setAiResponses(responses);
      })
      .catch((err) => {
        console.error(err);
        const reply = {
          id: id,
          text: 'error',
        };
        responses.unshift(reply);
        setAiResponses(responses);
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
        <div className="flex items-center justify-center w-full h-16 py-2 text-xl bg-gray-100 border-b border-gray-300">
          <div className="flex justify-center w-full max-w-screen-sm">
            <div className="w-1/4"></div>
            {/* This is here to maintain balance of the title bar, to allow the name to maintain center position. */}
            <div className="w-1/2">
              <h1 aria-label="Chat Name">{aiName}</h1>
            </div>
            <div className="flex justify-end w-1/4">
              <BasicMenu chatColor={chatColor} setChatColor={setChatColor} />
            </div>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex flex-col-reverse w-full max-w-screen-sm px-4 overflow-scroll grow scrollbar-hide">
          {prevRequests.map((prompt, index) => {
            const reply = aiResponses.filter((obj) => obj.id === prompt.id)[0]; // id ensures that the correctly matched prompt and response are passed to the ResponsePair component.
            return (
              <ResponsePair
                key={prompt.id}
                prompt={prompt.text}
                response={reply ? reply.text : null}
                chatColor={chatColor}
              />
            );
          })}
          <div className="flex justify-center w-full mb-4 text-sm text-gray-500">
            Your conversation with {`${aiName}`} started.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-screen-sm bg-white"
        >
          <input
            aria-label="Enter prompt"
            className="w-4/5 h-12 p-2 m-2 border border-black rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-500 active:border-blue-500"
            value={request}
            onChange={handleChange}
          />
          <button
            className={` rounded-lg p-2 m-2 w-1/5 bg-blue-600 hover:bg-blue-400 text-white  ${
              chatColor == '#FECACA'.toLowerCase()
                ? 'bg-red-600 hover:bg-red-400'
                : chatColor == '#FED7AA'.toLowerCase()
                ? 'bg-orange-600 hover:bg-orange-400'
                : chatColor == '#FEF08A'.toLowerCase()
                ? 'bg-yellow-400 hover:bg-yellow-300 text-black'
                : chatColor == '#BBF7D0'.toLowerCase()
                ? 'bg-green-600 hover:bg-green-400'
                : chatColor == '#A5F3FC'.toLowerCase()
                ? 'bg-cyan-600 hover:bg-cyan-400'
                : chatColor == '#BFDBFE'.toLowerCase()
                ? 'bg-blue-600 hover:bg-blue-400'
                : chatColor == '#DDD6FE'.toLowerCase()
                ? 'bg-violet-600 hover:bg-violet-400'
                : chatColor == '#FBCFE8'.toLowerCase()
                ? 'bg-pink-600 hover:bg-pink-400'
                : 'bg-blue-600 hover:bg-blue-400'
            }`}
            type="submit"
          >
            Send
          </button>
        </form>
      </Layout>
    </>
  );
}
