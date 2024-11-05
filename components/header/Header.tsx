import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
  return (
    <div className="container mx-auto h-[5vh]">
      <div className="flex justify-between">
        <Link href="/">
          <div>Hot news</div>
        </Link>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
