import Link from 'next/link';

type Props = {
  href: string;
  title: string;
};

const NavLink = (props: Props) => {
  return <Link href={props.href}>{props.title}</Link>;
};

export default NavLink;
