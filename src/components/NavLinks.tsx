
import { links } from '../utils';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../lib/hooks';

function NavLinks() {
  const user = useAppSelector((state)=> state.userState.user)
  return (
    <div className='hidden lg:flex justify-between items-center gap-x-10 pe-16'>
      {links.map((link) => {
        const restrictedRoutes = link.href === 'checkout' || link.href === 'orders' || link.href === 'profile'
        if(restrictedRoutes && !user) return null;
        return (
          <NavLink
            to={link.href}
            className={({ isActive }) => {
              return `capitalize font-light tracking-wide ${
                isActive ? 'text-primary' : ''
              }`;
            }}
            key={link.label}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks;
