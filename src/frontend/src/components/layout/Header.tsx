import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "../../data/sampleData";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Latest Jobs", to: "/category/Latest Jobs" },
  { label: "Admit Card", to: "/category/Admit Card" },
  { label: "Results", to: "/category/Results" },
  { label: "Government Schemes", to: "/category/Government Schemes" },
  { label: "Scholarships", to: "/category/Scholarships" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate({ to: "/search", search: { q: searchTerm.trim() } });
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <header>
      {/* Top utility bar */}
      <div className="bg-navy-dark text-xs text-white/70 py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Rojgar Khabar - Sarkari Naukri Portal</span>
          <span>Sun, Apr 05, 2026</span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" data-ocid="header.link">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/untitled-1-019d5c99-a055-774f-b32f-e7b588a626c1.png"
                  alt="Rojgar Khabar Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop search */}
            <div className="hidden md:flex items-center gap-2">
              {searchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search jobs, results..."
                    className="bg-white text-foreground px-3 py-1.5 rounded-sm text-sm w-64 focus:outline-none"
                    data-ocid="header.search_input"
                  />
                  <button
                    type="submit"
                    className="portal-btn-primary py-1.5"
                    data-ocid="header.submit_button"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-white/70 hover:text-white"
                    data-ocid="header.close_button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="text-white/80 hover:text-white p-2 rounded"
                  aria-label="Open search"
                  data-ocid="header.search_input"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              <Link
                to="/admin"
                className="portal-btn-primary text-xs"
                data-ocid="header.link"
              >
                Admin
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
              data-ocid="header.toggle"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-navy-dark hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-0">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-2.5 text-sm font-medium transition-colors"
                  activeProps={{
                    className:
                      "text-white bg-accent px-4 py-2.5 text-sm font-medium block",
                  }}
                  data-ocid="header.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          <div className="container mx-auto px-4 py-2">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-white/10 text-white placeholder-white/50 px-3 py-2 rounded-sm text-sm focus:outline-none focus:bg-white/20"
                data-ocid="header.search_input"
              />
              <button
                type="submit"
                className="portal-btn-primary py-2 px-3"
                data-ocid="header.submit_button"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block text-white/80 hover:text-white py-2.5 text-sm border-b border-white/10"
                    data-ocid="header.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="portal-btn-primary text-sm w-full justify-center"
                  data-ocid="header.link"
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Orange accent stripe */}
      <div className="h-1 bg-accent" />
    </header>
  );
}

export { CATEGORIES };
