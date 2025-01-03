import { useEffect, useState } from "react";

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

export default function ShaCompression() {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { InlineMath, BlockMath } = KaTeX;

  // TODO: 增加单步调试
  // 压缩函数中使用的常量K（前64个质数的立方根小数部分的前32位）
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbeef9a3f, 0xc67178f2,
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">
          4. Compression Function
        </h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Process the message schedule words with the working variables through
          64 rounds of compression, using the SHA-256 compression function.
        </div>

        {/* Working Variables */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Working Variables:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <BlockMath math="a = H_0, b = H_1, c = H_2, d = H_3" />
            <BlockMath math="e = H_4, f = H_5, g = H_6, h = H_7" />
          </div>
        </div>

        {/* Compression Round */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">
            For each round i (0 to 63):
          </div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath
                math={`
                  \\Sigma_0 = ROTR^2(a) \\oplus ROTR^{13}(a) \\oplus ROTR^{22}(a)
                `}
              />
              <BlockMath
                math={`
                  \\Sigma_1 = ROTR^6(e) \\oplus ROTR^{11}(e) \\oplus ROTR^{25}(e)
                `}
              />
              <BlockMath
                math={`
                  Ch(e,f,g) = (e \\land f) \\oplus (\\neg e \\land g)
                `}
              />
              <BlockMath
                math={`
                  Maj(a,b,c) = (a \\land b) \\oplus (a \\land c) \\oplus (b \\land c)
                `}
              />
              <BlockMath
                math={`
                  T_1 = h + \\Sigma_1 + Ch(e,f,g) + K_i + W_i
                `}
              />
              <BlockMath
                math={`
                  T_2 = \\Sigma_0 + Maj(a,b,c)
                `}
              />
            </div>
          </div>
        </div>

        {/* Variable Update */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Update Variables:</div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath math="h = g" />
              <BlockMath math="g = f" />
              <BlockMath math="f = e" />
              <BlockMath math="e = d + T_1" />
              <BlockMath math="d = c" />
              <BlockMath math="c = b" />
              <BlockMath math="b = a" />
              <BlockMath math="a = T_1 + T_2" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="text-xs text-white/60 space-y-2">
          <div>Where:</div>
          <div className="space-x-4">
            <InlineMath math="\land = \text{AND}" />
            <InlineMath math="\oplus = \text{XOR}" />
            <InlineMath math="\neg = \text{NOT}" />
          </div>
        </div>

        {/* Constants */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Round Constants (K0-K63):</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {K.map((value, index) => (
              <div
                key={index}
                className="font-mono text-xs bg-[#131619] p-2 rounded flex items-center justify-between"
              >
                <span className="text-white/60">K{index}</span>
                <span className="text-violet-400">
                  {value.toString(16).padStart(8, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
