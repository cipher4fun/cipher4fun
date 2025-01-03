import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

interface RsaPrimeSelectionProps {
  p: string;
  q: string;
}

export default function RsaPrimeSelection({ p, q }: RsaPrimeSelectionProps) {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { BlockMath } = KaTeX;

  const n = BigInt(p) * BigInt(q);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">1. Prime Selection</h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Choose two distinct prime numbers p and q. The security of RSA depends
          on the difficulty of factoring their product n = p × q.
        </div>

        {/* Selected Primes */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Selected Prime Numbers:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math={`p = ${p}`} />
              <BlockMath math={`q = ${q}`} />
              <BlockMath math={`n = p \\times q = ${n.toString()}`} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="text-sm text-white/80 bg-[#131619] p-3 rounded">
          Note: In practice, p and q should be very large prime numbers
          (typically 1024 bits or larger) to ensure security. We use smaller
          numbers here for demonstration purposes.
        </div>
      </div>
    </div>
  );
}
