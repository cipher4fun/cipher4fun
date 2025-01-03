import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

export default function RsaSummary() {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { BlockMath } = KaTeX;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">
          5. Summary
        </h3>

        {/* Key Points */}
        <div className="space-y-4">
          <div className="text-sm text-white/80">
            The security of RSA relies on three key mathematical principles:
          </div>

          <div className="space-y-2">
            <div className="text-sm text-white/80">1. The Factoring Problem</div>
            <div className="text-xs text-white/80">
              Given n = pq, it is computationally infeasible to find p and q when n is large.
              This protects the private key d since its calculation requires φ(n) = (p-1)(q-1).
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-white/80">2. Euler&apos;s Totient Function</div>
            <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
              <BlockMath math="\phi(n) = (p-1)(q-1)" />
            </div>
            <div className="text-xs text-white/80">
              For a prime p, φ(p) = p-1. For n = pq where p,q are prime,
              φ(n) = (p-1)(q-1). This function is crucial for key generation.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-white/80">3. Euler&apos;s Theorem</div>
            <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
              <BlockMath math="m^{\phi(n)} \equiv 1 \pmod{n}" />
            </div>
            <div className="text-xs text-white/80">
              For coprime m and n, this theorem guarantees that encryption and
              decryption are inverse operations when ed ≡ 1 (mod φ(n)).
            </div>
          </div>

          <div className="text-sm text-white/80 mt-4">
            Practical Considerations:
          </div>
          <ul className="list-disc list-inside text-xs text-white/80 space-y-1">
            <li>Use large prime numbers (2048+ bits) for real-world security</li>
            <li>Implement proper padding schemes (e.g., PKCS#1) for secure usage</li>
            <li>Protect the private key and securely destroy p, q after key generation</li>
            <li>Consider hybrid encryption for large messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 