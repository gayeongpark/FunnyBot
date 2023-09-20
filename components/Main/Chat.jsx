import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Chat({ category }) {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = (e) => {
    // console.log('this is handleSubmit');
    e.preventDefault();
    if (!inputValue) {
      return; // do not send empty message
    }
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: inputValue },
    ]);
    sendMessage(inputValue);
    setInputValue('');
  };
  const sendMessage = async (message) => {
    // console.log('sendMessage');
    try {
      setisLoading(true);
      // fetching the data by axios
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
          },
        }
      );
      // console.log(response);
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        //Save the previous conversations
        { type: 'bot', message: response.data.choices[0].message.content },
        //This is the answer from ChatGPT
      ]);
      setisLoading(false);
    } catch (error) {
      setisLoading(true);
      // console.log(error);
    }
  };

  useEffect(() => {
    // console.log('this is useEffect');
    setIsMounted(true); // Set isMounted to true when the component mounts
    return () => setIsMounted(false); // Set isMounted to false when the component unmounts
  }, []);

  useEffect(() => {
    if (isMounted && category && chatLog.length === 0) {
      sendMessage(category); // Only call sendMessage if isMounted is true
    }
  }, [isMounted, category, chatLog.length]);
  //When I omit the dependencies array, React assumes that the effect depends on all props and state variables, and it rerenders the component every time any of them change.

  return (
    <div className='flex flex-col min-h-screen gap-2 justify-center items-center'>
      <h1
        className='text-[#fdd605] text-center py-3 font-black text-6xl rounded-md'
        style={{ WebkitTextStroke: '2.5px black' }}
      >
        Funny Bot
      </h1>

      <div className='p-6'>
        <div className='flex flex-col space-y-4'>
          {chatLog.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
                } rounded-lg p-4 text-white max-w-sm`}
              >
                {message.message}
              </div>
            </div>
          ))}
          {isLoading && (
            <div key={chatLog.length} className='flex justify-start'>
              <div className='bg-gray-600 animate-pulse rounded-lg p-4 text-white max-w-sm'></div>
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex-grow max-w-md'
        style={{ width: '80%' }}
      >
        <div className='flex justify-center sm:w-full rounded-lg border border-gray-700 bg-gray-800 max-w-md'>
          <input
            type='text'
            placeholder='What kind of joke you do want?'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='flex-grow px-4 py-2 max-w-md bg-transparent text-white focus:outline-none rounded-md'
          />
          <button
            className='right-0 rounded-md bg-red-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
            type='submit'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
