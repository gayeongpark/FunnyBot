import Image from 'next/image';
import logo from '/public/logo1.png';

export default function Nav({onImageClick}) {
    const handleClick = () => {
        onImageClick(true); // pass `true` to the callback function when the image is clicked
      };
  return (
    <div>
      <Image
        src={logo}
        className='cursor-pointer'
        width='250'
        height='200'
        alt='QUEST_LOGO'
        onClick={handleClick}
      />
    </div>
  );
}
