import { Link } from "@tanstack/react-router";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Sidebar } from "../components/layout/Sidebar";

export function ContactPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="portal-section-header mb-6">
              <span className="portal-section-header-title">
                Contact &amp; Information
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="portal-card p-5">
                <h3 className="font-bold text-base text-primary mb-3 border-l-4 border-accent pl-3">
                  Contact Information
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>info@rojgarkhabar.in</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Patna, Bihar - 800001, India</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Monday - Saturday: 9:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="portal-card p-5">
                <h3 className="font-bold text-base text-primary mb-3 border-l-4 border-accent pl-3">
                  About Rojgar Khabar
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rojgar Khabar is a trusted online platform dedicated to
                  providing the latest government job notifications, admit
                  cards, exam results, government schemes, and scholarship
                  updates for candidates from Bihar and across India.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="portal-card p-5 mb-5">
              <h3 className="font-bold text-base text-primary mb-3 border-l-4 border-accent pl-3">
                Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rojgar Khabar is an independent news and information portal. We
                are not affiliated with or endorsed by any government
                department, ministry, or official body. All information
                published on this website is sourced from official government
                websites and notifications. Readers are advised to verify
                information from the official sources before taking any action.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                We do not guarantee the accuracy, completeness, or timeliness of
                any information. Use of this website is at your own risk. For
                any official information, please visit the respective official
                government websites.
              </p>
            </div>

            {/* Privacy Policy */}
            <div className="portal-card p-5 mb-5">
              <h3 className="font-bold text-base text-primary mb-3 border-l-4 border-accent pl-3">
                Privacy Policy
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rojgar Khabar respects your privacy. We do not sell, trade, or
                otherwise transfer your personal information to outside parties.
                We may collect basic analytics data (page views, browser type)
                to improve our website performance. Cookies may be used to
                enhance your browsing experience.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                By using our website, you consent to our Privacy Policy. For any
                privacy concerns, contact us at info@rojgarkhabar.in.
              </p>
            </div>

            {/* Official Links */}
            <div className="portal-card p-5">
              <h3 className="font-bold text-base text-primary mb-3 border-l-4 border-accent pl-3">
                Official Government Websites
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    name: "Bihar Government",
                    url: "https://state.bihar.gov.in",
                  },
                  { name: "BPSC", url: "https://bpsc.bih.nic.in" },
                  {
                    name: "Bihar Board (BSEB)",
                    url: "https://biharboardonline.bihar.gov.in",
                  },
                  { name: "Bihar Police", url: "https://bpssc.bih.nic.in" },
                  { name: "Bihar SSC", url: "https://bssc.bihar.gov.in" },
                  {
                    name: "NHM Bihar",
                    url: "https://statehealthsocietybihar.org",
                  },
                ].map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-accent p-2 hover:bg-muted rounded-sm transition-colors"
                    data-ocid="contact.link"
                  >
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
