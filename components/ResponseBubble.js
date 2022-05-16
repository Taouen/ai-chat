const ResponseBubble = ({ response }) => {
  return (
    <div className="border rounded-lg p-2 my-1 w-max max-w-[80%]  bg-blue-200 w-full self-end text-left break-words">
      {response}
    </div>
  );
};

export default ResponseBubble;
