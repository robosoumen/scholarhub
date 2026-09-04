import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Logo from "../../Components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="transition-transform duration-200 hover:scale-105"
        >
          <div className="w-28 md:w-32">
            <Logo />
          </div>
        </Link>

        {/* Copyright */}
        <p className="text-center text-sm text-base-content/70">
          © {new Date().getFullYear()} ScholarHub. All rights reserved.
        </p>

        {/* Social Media */}
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <a className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-primary-content">
            <FaFacebookF size={17} />
          </a>

          {/* LinkedIn */}
          <a className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-primary-content">
            <FaLinkedinIn size={17} />
          </a>

          {/* GitHub */}
          <a className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-primary-content">
            <FaGithub size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-base-content/10">
        <p className="py-3 text-center text-xs text-base-content/50">
          Empowering students to discover the right scholarships.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
