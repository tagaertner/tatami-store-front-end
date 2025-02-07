import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-muted mt-auto">
      <div className="align-element py-2">
        <div className="flex gap-x-2 sm:gap-x-8 justify-center">
          {footerLinks.map((link) => (
            <Link 
              key={link.label}
              to={link.href}
              className="text-xs sm:text-sm capitalize font-light tracking-wide hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-muted-foreground/20 mt-4 pt-2 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tatami: All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;