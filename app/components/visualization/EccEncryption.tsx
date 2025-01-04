import { useEffect, useState } from "react";
import type { Point } from "~/utils/ecc";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

interface Props {
  message: number;
  publicKey: Point;
  k: number;
  R: Point;
  S: Point;
  cipher: bigint;
}

export default function EccEncryption({
  message,
  publicKey,
  k,
  R,
  S,
  cipher,
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
      <h3 className="text-lg text-white">2. Encryption</h3>

      <div className="space-y-4">
        <p className="text-white/80">
          The message is encrypted using the public key Q and a random number k.
        </p>

        {/* Input Values */}
        <div>
          <div className="text-sm text-white/80 mb-2">Input Values:</div>
          <div className="font-mono text-sm bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath math={`m = ${message}`} />
            <BlockMath math={`Q = (${publicKey.x}, ${publicKey.y})`} />
            <BlockMath math={`k = ${k}`} />
          </div>
        </div>

        {/* Encryption Steps */}
        <div>
          <div className="text-sm text-white/80 mb-2">
            The encryption process involves these steps:
          </div>
          <div className="font-mono text-sm bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath math={` R = kG = (${R.x}, ${R.y})`} />
            <BlockMath math={` S = kQ = (${S.x}, ${S.y})`} />
            <BlockMath math={` c \\equiv m + x_S \\pmod{p} = ${cipher}`} />
          </div>
        </div>

        {/* Basic Idea */}
        <div>
          <div className="text-sm text-white/80 mb-2">The basic idea is:</div>
          <div className="font-mono text-sm bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <div>
                1. The shared secret S is computed in two equivalent ways:
              </div>
              <BlockMath math="S = kQ = k(dG) = d(kG) = dR" />
              <div>
                2. This works because scalar multiplication is commutative:
              </div>
              <BlockMath math="k(dG) = d(kG)" />
              <div>
                3. Only the sender knows k, only the receiver knows d, but they
                both can compute the same point S:
              </div>
              <BlockMath math="\text{Sender: } S = kQ = k(dG)" />
              <BlockMath math="\text{Receiver: } S = dR = d(kG)" />
              <div>
                4. The x-coordinate of S is then used as a shared key to encrypt
                the message:
              </div>
              <BlockMath math="c \equiv m + x_S \pmod{p}" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
