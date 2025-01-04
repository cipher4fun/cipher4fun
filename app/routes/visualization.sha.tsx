import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";
import { useTranslation } from '~/hooks/useTranslation';
import { useEffect, useState } from "react";
import pkg from "crypto-js";
import ShaMessagePadding from "~/components/visualization/ShaMessagePadding";
import ShaInitialHash from "~/components/visualization/ShaInitialHash";
import ShaMessageSchedule from "~/components/visualization/ShaMessageSchedule";
import ShaCompression from "~/components/visualization/ShaCompression";
import ShaFinalHash from "~/components/visualization/ShaFinalHash";
const { SHA256 } = pkg;

export const meta: MetaFunction = () => {
  return [
    { title: "SHA Visualization" },
    { name: "description", content: "Secure Hash Algorithms visualization" },
  ];
};

export default function SHAVisualization() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = () => {
    if (!input) return;
    const hash = SHA256(input);
    setResult(hash.toString());
    setShow(true);
  };

  return (
    <AlgorithmLayout
      title={
        mounted
          ? t("categories.digest.sha.name")
          : "Secure Hash Algorithms (SHA)"
      }
      description={
        mounted
          ? t("categories.digest.sha.description")
          : "SHA-1/SHA-2/SHA-3 family. Produces fixed-size message digests"
      }
    >
      <div className="space-y-8">
        <div className="text-white">
          <p>
            {mounted
              ? t("categories.digest.sha.input.intro")
              : "Secure Hash Algorithms (SHA) is a family of cryptographic hash functions designed to provide fixed-size message digests with collision resistance."}
          </p>
        </div>
        <section>
          <div className="space-y-4">
            {/* Input Section */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-white/60">
                {mounted
                  ? t("categories.digest.sha.input.label")
                  : "Message to Hash"}
              </label>
              <div className="flex gap-4">
                <input
                  id="message"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    mounted
                      ? t("categories.digest.sha.input.placeholder")
                      : "Enter message..."
                  }
                  className="flex-1 px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
                />
                <button
                  onClick={handleCalculate}
                  className="px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
                >
                  {mounted
                    ? t("categories.digest.sha.input.calculate")
                    : "Calculate Hash"}
                </button>
              </div>
            </div>

            {/* Result Section */}
            {result && (
              <div className="space-y-2">
                <div className="text-sm text-white/60">
                  {mounted
                    ? t("categories.digest.sha.input.result")
                    : "Hash Result:"}
                </div>
                <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded">
                  <code className="text-violet-400 break-all">{result}</code>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Hashing Steps</h2>
          {show && <ShaMessagePadding message={input} />}
          {show && <ShaInitialHash />}
          {show && <ShaMessageSchedule message={input} />}
          {show && <ShaCompression />}
          {show && <ShaFinalHash result={result} />}
        </section>
      </div>
    </AlgorithmLayout>
  );
}
