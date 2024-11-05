import Nav from './Nav';

const Header = () => {
  return (
    <div className="container mx-auto h-[5vh]">
      <div className="flex justify-between">
        <div>Hot news</div>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
