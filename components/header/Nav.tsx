import NavLink from './NavLink';

const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink href="/news" title="Latest news" />
        </li>
        <li>
          <NavLink href="/login" title="Login" />
        </li>
        <li>
          <NavLink href="/logout" title="Logout" />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
