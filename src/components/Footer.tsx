import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="align-element">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((link) => (
            <div key={link.label} className="flex flex-col items-center md:items-start">
              <Link 
                to={link.href}
                className="capitalize font-light tracking-wide hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tatami All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;