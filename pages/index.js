import Nav from '@/components/Navigation/Nav';
import Body from '@/components/Main/Body';
import Foot from '@/components/Footer/Foot';
import Chat from '@/components/Main/Chat';
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');

  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = (isClicked) => {
    // console.log(isClicked);
    setIsImageClicked(isClicked);
    setCategory('');
    setIsImageClicked(false);
  };

  return (
    <div className='bg-blue-900'>
      <Nav onImageClick={handleImageClick} />
      {category && !isImageClicked ? (
        <Chat category={category} />
      ) : (
        <Body setCategory={setCategory} />
      )}
      <Foot />
    </div>
  );
}
