import ResponseBubble from '../components/ResponseBubble';
import PromptBubble from '../components/PromptBubble';

const ResponsePair = ({ prompt, response }) => {
  return (
    <div className="flex flex-col w-full">
      <PromptBubble prompt={prompt} />

      <ResponseBubble response={response} />
    </div>
  );
};

export default ResponsePair;
