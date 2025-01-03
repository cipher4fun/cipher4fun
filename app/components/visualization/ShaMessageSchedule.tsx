import { useEffect, useState } from "react";

interface ShaMessageScheduleProps {
  message: string;
}

interface KaTeXModule {
  InlineMath: React.ComponentType<{ math: string }>;
  BlockMath: React.ComponentType<{ math: string }>;
}

export default function ShaMessageSchedule({
  message,
}: ShaMessageScheduleProps) {
  const [KaTeX, setKaTeX] = useState<KaTeXModule | null>(null);

  useEffect(() => {
    import("react-katex").then((module) => {
      setKaTeX(module);
    });
  }, []);

  if (!KaTeX) return null;

  const { InlineMath, BlockMath } = KaTeX;

  // 将消息转换为二进制，并进行填充（这部分逻辑可以复用之前的代码）
  const stringToBinary = (str: string): string => {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  };

  // 将二进制字符串转换为32位字的数组
  const getMessageSchedule = (binaryMessage: string): number[] => {
    const W: number[] = new Array(64).fill(0);

    // 前16个字直接从消息块中获取
    for (let i = 0; i < 16; i++) {
      W[i] = parseInt(binaryMessage.slice(i * 32, (i + 1) * 32), 2);
    }

    // 生成剩余的48个字
    for (let i = 16; i < 64; i++) {
      const s0 =
        rightRotate(W[i - 15], 7) ^
        rightRotate(W[i - 15], 18) ^
        (W[i - 15] >>> 3);
      const s1 =
        rightRotate(W[i - 2], 17) ^
        rightRotate(W[i - 2], 19) ^
        (W[i - 2] >>> 10);
      W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
    }

    return W;
  };

  // 右旋转函数
  const rightRotate = (n: number, d: number): number => {
    return (n >>> d) | (n << (32 - d));
  };

  // 获取第一个消息块的扩展结果
  const binaryMessage = stringToBinary(message);
  const paddedMessage =
    binaryMessage +
    "1" +
    "0".repeat(447 - binaryMessage.length) +
    binaryMessage.length.toString(2).padStart(64, "0");
  const W = getMessageSchedule(paddedMessage.slice(0, 512));

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">3. Message Schedule</h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Expand the 512-bit block into 64 32-bit words. First 16 words (W0-W15)
          are taken directly from the message block, and the remaining words are
          generated using a specific formula.
        </div>

        {/* Message Schedule Words */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">
            Message Schedule Words (W0-W63):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {W.map((word, index) => (
              <div
                key={index}
                className="font-mono text-xs bg-[#131619] p-2 rounded flex items-center justify-between"
              >
                <span className="text-white/60">
                  <InlineMath
                    math={`W_{${index.toString().padStart(2, "0")}}`}
                  />
                </span>
                <span
                  className={`${
                    index < 16 ? "text-green-400" : "text-violet-400"
                  }`}
                >
                  {word.toString(16).padStart(8, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">
            Formula for Wi (16 ≤ i ≤ 63):
          </div>
          <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
            <div className="space-y-2">
              <BlockMath
                math={`
                \\sigma_0 = ROTR^7(W_{i-15}) \\oplus ROTR^{18}(W_{i-15}) \\oplus SHR^3(W_{i-15})
              `}
              />
              <BlockMath
                math={`
                \\sigma_1 = ROTR^{17}(W_{i-2}) \\oplus ROTR^{19}(W_{i-2}) \\oplus SHR^{10}(W_{i-2})
              `}
              />
              <BlockMath
                math={`
                W_i = W_{i-16} + \\sigma_0 + W_{i-7} + \\sigma_1
              `}
              />
            </div>
          </div>
          <div className="text-xs text-white/60 space-x-4">
            <span>Where:</span>
            <InlineMath math="ROTR^n(x) = (x \ggg n) \lor (x \lll (32-n))" />
            <InlineMath math="SHR^n(x) = x \ggg n" />
            <InlineMath math="\oplus = \text{XOR}" />
          </div>
        </div>
      </div>
    </div>
  );
}
