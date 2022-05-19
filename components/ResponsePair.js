import ResponseBubble from '../components/ResponseBubble';
import PromptBubble from '../components/PromptBubble';

const ResponsePair = ({ prompt, response, chatColor }) => {
  return (
    <div className="flex flex-col w-full">
      <PromptBubble prompt={prompt} chatColor={chatColor} />

      <ResponseBubble response={response} />
    </div>
  );
};

export default ResponsePair;
