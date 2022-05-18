const ResponseBubble = ({ prompt }) => {
  return (
    <div className=" rounded-lg p-2 my-2 bg-blue-200 w-max max-w-[80%] text-left break-words self-end">
      {prompt}
    </div>
  );
};

export default ResponseBubble;
