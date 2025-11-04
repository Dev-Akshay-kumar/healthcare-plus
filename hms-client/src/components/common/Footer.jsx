import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white mt-20  shadow-inner">
      <div className="container mx-auto px-6 py-8 grid md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold mb-3 tracking-wide">
            Health<span className="text-[#0A9586]">Connect</span>
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Making healthcare accessible — find hospitals, consult doctors, and
            manage appointments effortlessly with technology that cares.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-white/20 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 mt-3">
            {[
              { to: "/", label: "Home" },
              { to: "/hospitals", label: "Hospitals" },
              { to: "/doctors", label: "Doctors" },
              { to: "/appointments", label: "Appointments" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="text-gray-300 hover:text-[#0A9586] transition duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-white/20 inline-block pb-1">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📧 support@healthconnect.in</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 New Delhi, India</li>
          </ul>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="bg-white/10 hover:bg-[#0A9586]/30 p-2.5 rounded-full transition-all duration-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-[#0A9586]/30 p-2.5 rounded-full transition-all duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-[#0A9586]/30 p-2.5 rounded-full transition-all duration-300"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 text-center py-5 text-sm text-gray-400 backdrop-blur-sm bg-gray-800/50">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#0A9586]">HealthConnect</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
