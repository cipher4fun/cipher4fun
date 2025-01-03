import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { RSA } from "~/utils/rsa";
import RsaPrimeSelection from "~/components/visualization/RsaPrimeSelection";
import RsaKeyGeneration from "~/components/visualization/RsaKeyGeneration";
import RsaEncryption from "~/components/visualization/RsaEncryption";
import RsaDecryption from "~/components/visualization/RsaDecryption";
import RsaSummary from "~/components/visualization/RsaSummary";

export const meta: MetaFunction = () => {
  return [
    { title: "RSA Visualization" },
    { name: "description", content: "RSA Algorithm Visualization" },
  ];
};

export default function RSAVisualization() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [decrypted, setDecrypted] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = () => {
    if (!p || !q || !message) return;

    if (message.length > 6) {
      alert(
        "Message length should not exceed 6 characters due to small prime numbers used in this demo."
      );
      return;
    }

    const n = BigInt(p) * BigInt(q);
    const e = 65537n;

    const debug = RSA.debug(message, e, n);
    console.log("Debug info:", debug);

    const encrypted = RSA.encrypt(message, e, n);
    setResult(encrypted);
    setShow(true);
  };

  const handleDecrypt = () => {
    if (!p || !q || !result) return;

    const n = BigInt(p) * BigInt(q);
    const e = 65537n;
    const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

    const d = RSA.modInverse(e, phi);

    console.log("e*d mod phi:", (e * d) % phi);

    console.log("Decryption info:", {
      n,
      e,
      phi,
      d,
      ciphertext: result,
    });

    const decryptedMessage = RSA.decrypt(result, d, n);
    setDecrypted(decryptedMessage);
  };

  const handleGeneratePrimes = () => {
    const { p: newP, q: newQ } = RSA.generatePrimePair();
    setP(newP.toString());
    setQ(newQ.toString());
  };

  return (
    <AlgorithmLayout
      title={mounted ? t("categories.asymmetric.rsa.name") : "RSA Algorithm"}
      description={
        mounted
          ? t("categories.asymmetric.rsa.description")
          : "Public-key crypto based on factoring. Used for encryption & signatures"
      }
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="text-white space-y-4">
          <p>
            {mounted
              ? t("categories.asymmetric.rsa.intro")
              : "RSA (Rivest-Shamir-Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission. The encryption key is public and distinct from the decryption key which is kept secret (private)."}
          </p>
          <p className="text-white/80">
            {mounted
              ? t("categories.asymmetric.rsa.security")
              : "The security of RSA relies on the practical difficulty of factoring the product of two large prime numbers - the factoring problem."}
          </p>
        </div>

        {/* Input Section */}
        <section>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="p" className="block text-sm text-white/60">
                    First Prime (p):
                  </label>
                  <input
                    id="p"
                    type="number"
                    value={p}
                    readOnly
                    className="w-full px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="q" className="block text-sm text-white/60">
                    Second Prime (q):
                  </label>
                  <input
                    id="q"
                    type="number"
                    value={q}
                    readOnly
                    className="w-full px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
              <button
                onClick={handleGeneratePrimes}
                className="w-full px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
              >
                Generate Primes
              </button>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-white/60">
                Message to Encrypt:
              </label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    id="message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message... (max 6 chars)"
                    maxLength={6}
                    className="w-full px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/40">
                    {message.length}/6
                  </div>
                </div>
                <button
                  onClick={handleCalculate}
                  className="px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
                >
                  Calculate
                </button>
              </div>
            </div>

            {/* Result Section */}
            {result && (
              <div className="space-y-2">
                <div className="text-sm text-white/60">Encrypted Result:</div>
                <textarea
                  readOnly
                  value={result}
                  className="w-full h-10 px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-violet-400 focus:outline-none resize-y"
                />
                <button
                  onClick={handleDecrypt}
                  className="w-full px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
                >
                  Decrypt
                </button>
              </div>
            )}

            {/* Decrypted Result Section */}
            {decrypted && (
              <div className="space-y-2">
                <div className="text-sm text-white/60">Decrypted Message:</div>
                <textarea
                  readOnly
                  value={decrypted}
                  className="w-full h-10 px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-violet-400 focus:outline-none resize-y"
                />
              </div>
            )}

            {/* Warning Message */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded text-amber-200/80 space-y-2">
              <div className="text-sm font-medium">⚠️ Demo Limitations:</div>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>
                  Using small prime numbers for demonstration. In practice, RSA
                  keys should be at least 2048 bits.
                </li>
                <li>
                  Message length is limited to 6 characters due to small
                  modulus.
                </li>
                <li>
                  In real-world applications, RSA is typically used for key
                  exchange rather than direct message encryption:
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>
                      • RSA encrypts a random symmetric key (e.g., AES key)
                    </li>
                    <li>
                      • The symmetric key then encrypts the actual message
                    </li>
                    <li>• This hybrid approach is more efficient and secure</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">RSA Steps</h2>
          {show && (
            <div className="space-y-6">
              <RsaPrimeSelection p={p} q={q} />
              <RsaKeyGeneration p={p} q={q} />
              <RsaEncryption
                message={message}
                e={65537n}
                n={BigInt(p) * BigInt(q)}
                result={result}
              />
              {decrypted && (
                <RsaDecryption
                  ciphertext={result}
                  d={RSA.modInverse(
                    65537n,
                    (BigInt(p) - 1n) * (BigInt(q) - 1n)
                  )}
                  n={BigInt(p) * BigInt(q)}
                  decrypted={decrypted}
                />
              )}
              <RsaSummary />
            </div>
          )}
        </section>
      </div>
    </AlgorithmLayout>
  );
}
