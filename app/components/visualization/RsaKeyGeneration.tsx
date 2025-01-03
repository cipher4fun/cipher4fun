import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

interface RsaKeyGenerationProps {
  p: string;
  q: string;
}

export default function RsaKeyGeneration({ p, q }: RsaKeyGenerationProps) {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { BlockMath } = KaTeX;

  const n = BigInt(p) * BigInt(q);
  const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);
  const e = 65537n;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">2. Key Generation</h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Calculate the public key (e, n) and private key (d, n) using Euler's
          totient function φ(n).
        </div>

        {/* Calculations */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Modulus and Totient:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math={`n = p \\times q = ${n.toString()}`} />
              <BlockMath math={`\\phi(n) = (p-1)(q-1) = ${phi.toString()}`} />
            </div>
          </div>
        </div>

        {/* Public Key */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Public Key (e, n):</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math={`e = ${e.toString()}`} />
              <BlockMath math={`n = ${n.toString()}`} />
            </div>
          </div>
          <div className="text-xs text-white/80">
            Note: e is chosen to be 65537 (2^16 + 1) as it's a Fermat prime and
            provides good performance.
          </div>
        </div>

        {/* Private Key */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Private Key (d, n):</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math="e \cdot d \equiv 1 \pmod{\phi(n)}" />
            </div>
          </div>
          <div className="text-xs text-white/80 space-y-2">
            <p>
              Where d is the modular multiplicative inverse of e modulo φ(n),
              which can be computed using the Extended Euclidean Algorithm.
            </p>
            <p className="text-red-400">
              Important: After key generation, p and q must be securely
              destroyed. Only n, e (public) and d (private) are kept.
            </p>
          </div>
        </div>

        {/* Encryption/Decryption Process */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Why This Works:</div>
          <div className="text-xs text-white/80 space-y-2">
            <p>
              Since ed ≡ 1 (mod φ(n)), by Euler's theorem: m<sup>ed</sup> ≡ m
              (mod n)
            </p>
            <p>
              This ensures that decryption recovers the original message, while
              the private key d remains secure as long as factoring n remains
              difficult. We will see how this works in the next section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
