const ResponseBubble = ({ response }) => {
  return (
    <div className="border rounded-lg p-2 my-1 w-max max-w-[80%]  bg-gray-200 w-full self-start text-left break-words">
      {response}
    </div>
  );
};

export default ResponseBubble;
