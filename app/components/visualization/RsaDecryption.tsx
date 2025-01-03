import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

interface RsaDecryptionProps {
  ciphertext: string;
  d: bigint;
  n: bigint;
  decrypted: string;
}

export default function RsaDecryption({
  ciphertext,
  d,
  n,
  decrypted,
}: RsaDecryptionProps) {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { BlockMath } = KaTeX;

  const c = BigInt("0x" + ciphertext);
  const decryptedBytes = new TextEncoder().encode(decrypted);
  const decryptedHex = Array.from(decryptedBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">
          4. Decryption Process
        </h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Using the private key (d, n), decrypt the ciphertext c to recover the
          original message m.
        </div>

        {/* Decryption Formula */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Decryption:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math="m \equiv c^d \pmod{n}" />
              <BlockMath math={`m \\equiv ${c}^{${d}} \\pmod{${n}}`} />
            </div>
          </div>
        </div>

        {/* Message Recovery */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">
            Recovered Message:
          </div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math={`\\text{hex} = ${decryptedHex}`} />
              <BlockMath math={`\\text{message} = ${decrypted}`} />
            </div>
          </div>
          <div className="text-xs text-white/80">
            The decrypted number is converted back to bytes and then to text.
          </div>
        </div>

        {/* Correctness Proof */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Why Decryption Works:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math="c^d \equiv (m^e)^d \equiv m^{ed} \pmod{n}" />
              <BlockMath math="ed \equiv 1 \pmod{\phi(n)}" />
              <BlockMath math="\therefore m^{ed} \equiv m \pmod{n}" />
            </div>
          </div>
          <div className="text-xs text-white/80">
            By Euler's theorem, since ed ≡ 1 (mod φ(n)), raising m to the power
            of ed modulo n yields m back.
          </div>
        </div>
      </div>
    </div>
  );
} 