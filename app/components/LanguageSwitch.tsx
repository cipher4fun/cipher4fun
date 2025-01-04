import { useEffect, useState } from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation(undefined, {
    useSuspense: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en";
    localStorage.setItem("preferred_language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-[#1A1D24] transition-all"
    >
      <LanguageIcon className="w-5 h-5" />
      <span className="text-sm">
        {i18n.language === "en" ? "中文" : "EN"}
      </span>
    </button>
  );
} 