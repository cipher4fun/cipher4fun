import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-64 min-w-[256px] bg-[#0D1117] text-white p-6 py-8 border-r border-gray-800">
      <div className="space-y-4">
        <ul className="space-y-2">
          <li>
            <Link to="/visualization" className="block hover:text-blue-400">
              {mounted ? t("nav.visualization") : "Visualization"}
            </Link>
          </li>
          <li>
            <Link to="/course" className="block hover:text-blue-400">
              {mounted ? t("nav.course") : "Course"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
} 