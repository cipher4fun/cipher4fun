import { Link } from "@remix-run/react";
import { useTranslation } from "~/hooks/useTranslation";
import { FaTwitter, FaTelegram, FaBars } from "react-icons/fa";
import { useSidebar } from "~/contexts/SidebarContext";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden text-white/60 hover:text-white p-2"
      >
        <FaBars size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0D1117] text-white border-r border-gray-800 flex flex-col z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Navigation */}
        <div className="flex-1 p-6 py-8">
          <ul className="space-y-2">
            <li>
              <Link
                to="/visualization"
                className="block hover:text-violet-400"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.visualization")}
              </Link>
            </li>
            <li>
              <Link
                to="/course"
                className="block hover:text-violet-400"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.course")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="p-4 ">
          <div className="flex items-center justify-between text-white/60">
            <a
              href="https://x.com/wfnuser"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://t.me/+_a-io1KqMIc5ZjQ9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <FaTelegram size={20} />
            </a>
            <a
              href="https://according.work"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 271 282"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.51878 130.123C-2.09987 138.121 -1.79238 150.781 6.20543 158.399L24.7746 176.088C26.9892 167.758 33.5841 160.874 42.5531 158.715C44.8083 158.172 47.0659 157.964 49.2737 158.058L75.9143 88.6776C72.5126 85.3269 69.9756 81.015 68.7759 76.0311C67.7699 71.8519 67.8163 67.6655 68.7445 63.7507L5.51878 130.123ZM91.9316 96.1848C94.7927 96.4644 97.7483 96.2788 100.7 95.5682C103.362 94.9275 105.833 93.9052 108.067 92.5733L173.063 157.108C172.905 158.704 173.007 160.354 173.403 162.001C175.304 169.896 183.244 174.756 191.139 172.855C195.138 171.893 198.358 169.381 200.316 166.11L264.314 150.705C266.004 152.993 268.042 154.977 270.332 156.595L157.572 274.967C149.954 282.965 137.294 283.273 129.296 275.654L55.5722 205.426C67.6084 201.618 74.8169 189.086 71.8172 176.624C70.7366 172.134 68.4718 168.24 65.4343 165.191L91.9316 96.1848ZM259.173 133.794C259.466 127.239 262.203 121.091 266.682 116.496L151.049 6.34599C143.051 -1.27258 130.392 -0.965165 122.773 7.03262L87.1695 44.4086C87.5466 44.3001 87.9278 44.1994 88.3131 44.1066C102.524 40.686 116.817 49.433 120.238 63.6438C121.506 68.9132 121.101 74.194 119.365 78.9275L185.009 144.105C190.047 143.163 195.026 144.929 198.36 148.433L259.173 133.794Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
