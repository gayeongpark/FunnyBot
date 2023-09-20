import Image from 'next/image';
import robot from '/public/robot.png';

export default function Body({ setCategory }) {
  const handleClick = (category) => {
    setCategory(category);
  };
  return (
    <div className='flex flex-col min-h-screen gap-2 p-3 justify-center items-center'>
      <div>
        <Image
          className='motion-safe:animate-bounce'
          src={robot}
          width='350'
          height='300'
          alt='RobotImage'
        />
      </div>
      <div className='flex justify-center items-center text-white text-lg'>
        Welcome! I am a funny bot.
      </div>
      <div className='flex justify-center items-center text-white text-lg'>
        Do you want to hear some jokes?
      </div>
      <div className='flex justify-center items-center text-white text-lg'>
        Please select a category
      </div>
      <div className='flex justify-center gap-2 mt-10'>
        <button
          onClick={() => handleClick('tell me a pun joke')}
          className='rounded-md bg-red-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
        >
          Pun
        </button>
        <button
          onClick={() => handleClick('tell me a programming joke')}
          className='rounded-md bg-red-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
        >
          Programming
        </button>
        <button
          onClick={() => handleClick('tell me an anti joke')}
          className='rounded-md bg-red-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
        >
          Anti
        </button>
        <button
          onClick={() => handleClick('Hello')}
          className='rounded-md bg-red-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
        >
          Chat anyway
        </button>
      </div>
    </div>
  );
}
