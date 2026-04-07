import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-navy-dark text-white mt-8">
      {/* Orange top border */}
      <div className="h-1 bg-accent" />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img
                src="/assets/untitled-1-019d5c99-a055-774f-b32f-e7b588a626c1.png"
                alt="Rojgar Khabar Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Rojgar Khabar is a leading online platform providing the latest
              government job notifications, admit cards, results, government
              schemes, and scholarships for candidates in Bihar and across
              India.
            </p>
            <p className="text-white/40 text-xs mt-3">
              This website is not affiliated with any government organization.
              Content is for informational purposes only.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-white border-b border-accent pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Latest Jobs", to: "/category/Latest Jobs" },
                { label: "Admit Cards", to: "/category/Admit Card" },
                { label: "Results", to: "/category/Results" },
                {
                  label: "Government Schemes",
                  to: "/category/Government Schemes",
                },
                { label: "Scholarships", to: "/category/Scholarships" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-accent text-sm transition-colors flex items-center gap-1"
                    data-ocid="footer.link"
                  >
                    <span className="text-accent">&raquo;</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-white border-b border-accent pb-2">
              Contact &amp; Legal
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Email: info@rojgarkhabar.in</li>
              <li>Location: Patna, Bihar, India</li>
            </ul>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Privacy Policy", to: "/contact" },
                { label: "Disclaimer", to: "/contact" },
                { label: "About Us", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            &copy; {year} Rojgar Khabar. All rights reserved.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Built with ❤ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-0.5"
            >
              caffeine.ai <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
