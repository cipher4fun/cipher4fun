import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

interface RsaEncryptionProps {
  message: string;
  e: bigint;
  n: bigint;
  result: string;
}

export default function RsaEncryption({
  message,
  e,
  n,
  result,
}: RsaEncryptionProps) {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { BlockMath } = KaTeX;

  // 将消息转换为数字
  const encoder = new TextEncoder();
  const messageBytes = encoder.encode(message);
  const messageHex = Array.from(messageBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const m = BigInt("0x" + messageHex);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">
          3. Encryption Process
        </h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Using the public key (e, n), encrypt the message m to produce
          ciphertext c.
        </div>

        {/* Message Conversion */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">
            Message to Number Conversion:
          </div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math={`\\text{message} = ${message}`} />
              <BlockMath math={`\\text{hex} = ${messageHex}`} />
              <BlockMath math={`m = ${m}`} />
            </div>
          </div>
          <div className="text-xs text-white/80">
            The message is first converted to bytes, then to a hexadecimal
            number.
          </div>
        </div>

        {/* Encryption Formula */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Encryption:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math="c \equiv m^e \pmod{n}" />
              <BlockMath math={`c \\equiv ${m}^{${e}} \\pmod{${n}}`} />
              <BlockMath math={`c =  ${BigInt("0x" + result)} = ${result}`} />
            </div>
          </div>
        </div>

        {/* Fast Modular Exponentiation */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">
            Fast Modular Exponentiation Algorithm:
          </div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded">
            <pre className="text-violet-400 whitespace-pre-wrap">
              {`function modPow(base, exponent, modulus):
    if modulus = 1:
        return 0
    result = 1
    base = base mod modulus
    while exponent > 0:
        if exponent mod 2 = 1:
            result = (result * base) mod modulus
        base = (base * base) mod modulus
        exponent = exponent / 2
    return result`}
            </pre>
          </div>
          <div className="text-xs text-white/80 space-y-2">
            <p>
              This algorithm computes m<sup>e</sup> mod n efficiently using the
              square-and-multiply method:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Time complexity: O(log e)</li>
            </ul>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-xs text-white/80 space-y-2">
          <p>
            The encryption process uses modular exponentiation, which is
            efficient to compute in one direction but difficult to reverse
            without knowing the private key d.
          </p>
          <p>
            Even if an attacker knows m, e, and n, they cannot easily determine
            d without being able to factor n into its prime components p and q.
          </p>
        </div>
      </div>
    </div>
  );
}
