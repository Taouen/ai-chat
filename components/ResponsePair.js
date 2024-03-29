import { PulseLoader } from 'react-spinners';

const ResponsePair = ({ prompt, response, chatColor, error }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Prompt Bubble */}
      <div
        className={`rounded-lg p-2 my-2 ${
          // Tailwind cannot use dynamic values, so I have to chain these together to provide the full classname to select colour.
          chatColor == '#FECACA'.toLowerCase()
            ? 'bg-[#FECACA]'
            : chatColor == '#FED7AA'.toLowerCase()
            ? 'bg-[#FED7AA]'
            : chatColor == '#FEF08A'.toLowerCase()
            ? 'bg-[#FEF08A]'
            : chatColor == '#BBF7D0'.toLowerCase()
            ? 'bg-[#BBF7D0]'
            : chatColor == '#A5F3FC'.toLowerCase()
            ? 'bg-[#A5F3FC]'
            : chatColor == '#BFDBFE'.toLowerCase()
            ? 'bg-[#BFDBFE]'
            : chatColor == '#DDD6FE'.toLowerCase()
            ? 'bg-[#DDD6FE]'
            : chatColor == '#FBCFE8'.toLowerCase()
            ? 'bg-[#FBCFE8]'
            : 'bg-blue-200'
        } w-max max-w-[80%] text-left break-words self-end`}
      >
        {prompt}
      </div>

      {/* Response Bubble */}
      <div className="flex justify-center items-center rounded-lg p-2 my-2 w-max max-w-[80%] bg-gray-200 w-full self-start text-left break-words">
        {response ? (
          response === 'error' ? (
            'I had some trouble formulating a response. Please try again.'
          ) : (
            response
          )
        ) : (
          <PulseLoader color={chatColor} />
        )}
      </div>
    </div>
  );
};

export default ResponsePair;
