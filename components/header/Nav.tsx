import NavLink from './NavLink';
import NavUser from './NavUser';

const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink href="/news" title="Latest news" />
        </li>
        <NavUser />
      </ul>
    </nav>
  );
};
export default Nav;
