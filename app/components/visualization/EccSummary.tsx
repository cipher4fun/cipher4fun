import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

export default function EccSummary() {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { BlockMath } = KaTeX;

  return (
    <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
      <h3 className="text-lg text-white">4. Summary</h3>

      <div className="space-y-4">
        {/* Process Overview */}
        <div>
          <div className="text-sm text-white/80 mb-2">Process Overview:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div>
              <div className="text-sm text-violet-400/90">
                1. Key Generation
              </div>
              <BlockMath math="d \xleftarrow{\$} [1, n-1], \quad Q = dG" />
            </div>
            <div>
              <div className="text-sm text-violet-400/90">2. Encryption</div>
              <BlockMath math="R = kG, \quad S = kQ = k(dG)" />
              <BlockMath math="c \equiv m + x_S \pmod{p}" />
            </div>
            <div>
              <div className="text-sm text-violet-400/90">3. Decryption</div>
              <BlockMath math="S = dR = d(kG) = k(dG)" />
              <BlockMath math="m \equiv c - x_S \pmod{p}" />
            </div>
          </div>
        </div>

        {/* Security Analysis */}
        <div>
          <div className="text-sm text-white/80 mb-2">Security Analysis:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div>
              <div className="text-sm text-violet-400/90">
                The Elliptic Curve Discrete Logarithm Problem (ECDLP):
              </div>
              <BlockMath math="Q = dG \text{ (given Q and G, find d)}" />
              <div className="text-sm text-violet-400/90">
                Best known attack (Pollard's rho algorithm):
              </div>
              <BlockMath math="\text{Time complexity: } O(\sqrt{n})" />
              <BlockMath math="\text{For 256-bit curves: } n \approx 2^{256}" />
              <BlockMath math="\text{Security level: } \approx 2^{128} \text{ operations}" />
            </div>
          </div>
        </div>

        {/* Real-world Usage */}
        <div>
          <div className="text-sm text-white/80 mb-2">In Practice:</div>
          <ul className="text-sm text-white/80 list-disc list-inside space-y-1">
            <li>Use standardized curves (e.g., secp256k1, P-256)</li>
            <li>Random k for each encryption</li>
            <li>
              Usually used for key exchange (ECDH) rather than direct encryption
            </li>
            <li>Combined with symmetric encryption in hybrid systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
