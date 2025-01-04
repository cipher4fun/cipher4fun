import { useEffect, useState } from "react";
import type { Point } from "~/utils/ecc";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

interface Props {
  privateKey: number;
  R: Point;
  S: Point;
  cipher: bigint;
  message: number;
}

export default function EccDecryption({
  privateKey,
  R,
  S,
  cipher,
  message,
}: Props) {
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
      <h3 className="text-lg text-white">3. Decryption</h3>

      <div className="space-y-4">
        {/* Input Values */}
        <div>
          <div className="text-sm text-white/80 mb-2">Input Values:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath math={`d = ${privateKey}`} />
            <BlockMath math={`R = (${R.x}, ${R.y})`} />
            <BlockMath math={`c = ${cipher}`} />
          </div>
        </div>

        {/* Compute Shared Secret */}
        <div>
          <div className="text-sm text-white/80 mb-2">
            Compute Shared Secret:
          </div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath math={`S = dR = d(kG) = k(dG) = (${S.x}, ${S.y})`} />
          </div>
        </div>

        {/* Recover Message */}
        <div>
          <div className="text-sm text-white/80 mb-2">Recover Message:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath math={`m \\equiv c - x_S \\pmod{p}`} />
            <BlockMath math={`m = ${message}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
