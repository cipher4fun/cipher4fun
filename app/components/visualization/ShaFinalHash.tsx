import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

export default function ShaFinalHash({ result }: { result: string }) {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { InlineMath, BlockMath } = KaTeX;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">5. Final Hash Value</h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          After all message blocks are processed, the final hash value is
          computed by adding the initial hash values to the final working
          variables.
        </div>

        {/* Final Hash Computation */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Final Hash Update:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math="H_0^{new} = H_0^{old} + a" />
              <BlockMath math="H_1^{new} = H_1^{old} + b" />
              <BlockMath math="H_2^{new} = H_2^{old} + c" />
              <BlockMath math="H_3^{new} = H_3^{old} + d" />
              <BlockMath math="H_4^{new} = H_4^{old} + e" />
              <BlockMath math="H_5^{new} = H_5^{old} + f" />
              <BlockMath math="H_6^{new} = H_6^{old} + g" />
              <BlockMath math="H_7^{new} = H_7^{old} + h" />
            </div>
          </div>
        </div>

        {/* Final Output */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Final 256-bit Hash:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath
              math={`
                Hash = H_0 \\parallel H_1 \\parallel H_2 \\parallel H_3 \\parallel H_4 \\parallel H_5 \\parallel H_6 \\parallel H_7
              `}
            />
          </div>
          <div className="text-xs text-white/60">
            Where <InlineMath math="\parallel" /> represents concatenation
          </div>
        </div>

        {/* Note */}
        <div className="text-sm text-white/60 bg-[#131619] p-3 rounded">
          Note: Each H value is a 32-bit word, resulting in a final 256-bit
          (32-byte) hash value. The result is typically represented as a 64
          character hexadecimal string.
        </div>

        <div className="text-sm text-white/60">Hash Result:</div>
        <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
          {result}
        </div>
      </div>
    </div>
  );
}
