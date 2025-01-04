import type { MetaFunction } from "@remix-run/node";
import AlgorithmLayout from "~/components/AlgorithmLayout";
import { useTranslation } from '~/hooks/useTranslation';
import { useEffect, useState } from "react";
import { ECC } from "~/utils/ecc";
import EccPublicKeyGeneration from "~/components/visualization/EccPublicKeyGeneration";
import EccEncryption from "~/components/visualization/EccEncryption";
import EccDecryption from "~/components/visualization/EccDecryption";
import EccSummary from "~/components/visualization/EccSummary";

export const meta: MetaFunction = () => {
  return [
    { title: "ECC Visualization" },
    {
      name: "description",
      content: "Elliptic Curve Cryptography visualization",
    },
  ];
};

// 使用固定的曲线参数
const CURVE = {
  a: BigInt(2),
  b: BigInt(2),
  p: BigInt(17),
  G: { x: BigInt(5), y: BigInt(1) },
  n: BigInt(19),
};

// 创建 ECC 实例
const ecc = new ECC(CURVE);

// 验证基点是否在曲线上
const verifyPoint = (x: bigint, y: bigint, a: bigint, b: bigint, p: bigint) => {
  const left = (y * y) % p;
  const right = (x * x * x + a * x + b) % p;
  return left === right;
};

console.log(
  "Base point verification:",
  verifyPoint(BigInt(5), BigInt(13), BigInt(7), BigInt(9), BigInt(1000000007))
);

interface EncryptedResult {
  R: { x: bigint; y: bigint };
  S: { x: bigint; y: bigint };
  cipher: bigint;
  k: number;
}

export default function ECCVisualization() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  // 私钥和消息
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [encryptedResult, setEncryptedResult] =
    useState<EncryptedResult | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = () => {
    if (!privateKey || !message) return;

    const messageNum = parseInt(message);
    if (messageNum < 0 || messageNum >= 17) {
      alert("Message must be between 0 and 16");
      return;
    }

    const privateKeyNum = parseInt(privateKey);
    if (privateKeyNum < 1 || privateKeyNum > 18) {
      // n-1 = 18
      alert("Private key must be between 1 and 18");
      return;
    }

    // 1. 计算公钥
    const publicKey = ecc.getPublicKey(privateKeyNum);
    if (!publicKey) {
      alert("Failed to generate public key");
      return;
    }

    // 2. 加密消息
    const encrypted = ecc.encrypt(messageNum, publicKey);
    setEncryptedResult(encrypted);

    // 3. 设置显示结果 - 将 BigInt 转换为字符串
    setResult(
      JSON.stringify({
        R: {
          x: encrypted.R.x.toString(),
          y: encrypted.R.y.toString(),
        },
        cipher: encrypted.cipher.toString(),
      })
    );
    setShow(true);
  };

  const handleDecrypt = () => {
    if (!privateKey || !encryptedResult) return;

    const privateKeyNum = parseInt(privateKey);
    if (privateKeyNum < 1 || privateKeyNum > 1000000006) {
      alert("Private key must be between 1 and 1000000006");
      return;
    }

    const decryptedMessage = ecc.decrypt(
      encryptedResult.R,
      encryptedResult.cipher,
      privateKeyNum
    );

    setDecrypted(decryptedMessage.toString());
  };

  return (
    <AlgorithmLayout
      title={mounted ? t("categories.asymmetric.ecc.name") : "ECC"}
      description={
        mounted
          ? t("categories.asymmetric.ecc.description")
          : "Public-key crypto using elliptic curves. Shorter keys than RSA"
      }
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="text-white space-y-4">
          <p>
            Elliptic Curve Cryptography (ECC) is a public-key cryptography
            approach based on the algebraic structure of elliptic curves over
            finite fields.
          </p>
          <p className="text-white/80">
            Using curve: y² ≡ x³ + {CURVE.a.toString()}x + {CURVE.b.toString()}{" "}
            (mod {CURVE.p.toString()})
          </p>
          <p className="text-white/80">
            Base point G = ({CURVE.G.x.toString()}, {CURVE.G.y.toString()})
          </p>
        </div>

        {/* Input Section */}
        <section>
          <div className="space-y-4">
            {/* Private Key Input */}
            <div className="space-y-2">
              <label
                htmlFor="privateKey"
                className="block text-sm text-white/60"
              >
                Private Key (1-16):
              </label>
              <input
                type="number"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                min="1"
                max="16"
                className="w-full px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-white/60">
                Message to Encrypt (0-16):
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  min="0"
                  max="16"
                  className="flex-1 px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none"
                />
                <button
                  onClick={handleCalculate}
                  className="px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
                >
                  Encrypt
                </button>
              </div>
            </div>

            {/* Result Section */}
            {result && (
              <div className="space-y-2">
                <div className="text-sm text-white/60">Encrypted Result:</div>
                <div className="space-y-1">
                  <div className="text-xs text-white/60">Point R:</div>
                  <div className="font-mono text-xs bg-[#131619] p-2 rounded text-violet-400">
                    ({encryptedResult?.R.x.toString()},{" "}
                    {encryptedResult?.R.y.toString()})
                  </div>
                  <div className="text-xs text-white/60">Ciphertext:</div>
                  <div className="font-mono text-xs bg-[#131619] p-2 rounded text-violet-400">
                    {encryptedResult?.cipher.toString()}
                  </div>
                </div>
                <button
                  onClick={handleDecrypt}
                  className="w-full px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
                >
                  Decrypt
                </button>
              </div>
            )}

            {/* Decrypted Result */}
            {decrypted && (
              <div className="space-y-2">
                <div className="text-sm text-white/60">Decrypted Message:</div>
                <textarea
                  readOnly
                  value={decrypted}
                  className="w-full h-10 px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-violet-400 focus:outline-none resize-y"
                />
              </div>
            )}

            {/* Warning Message */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded text-amber-200/80 space-y-2">
              <div className="text-sm font-medium">⚠️ Demo Limitations:</div>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>
                  Using small numbers for demonstration. In practice, much
                  larger fields are used.
                </li>
                <li>
                  Message length is limited to 3 characters due to field size.
                </li>
                <li>
                  Real-world ECC implementations use standardized curves and
                  proper padding schemes.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">ECC Steps</h2>
          {show && (
            <div className="space-y-6">
              {(() => {
                try {
                  const publicKey = ecc.getPublicKey(parseInt(privateKey));
                  if (!publicKey) return null;

                  return (
                    <>
                      <EccPublicKeyGeneration
                        privateKey={parseInt(privateKey)}
                        basePoint={CURVE.G}
                        publicKey={publicKey}
                      />
                      {encryptedResult && (
                        <>
                          <EccEncryption
                            message={parseInt(message)}
                            publicKey={publicKey}
                            k={encryptedResult.k}
                            R={encryptedResult.R}
                            S={encryptedResult.S}
                            cipher={encryptedResult.cipher}
                          />
                          <EccDecryption
                            privateKey={parseInt(privateKey)}
                            R={encryptedResult.R}
                            S={encryptedResult.S}
                            cipher={encryptedResult.cipher}
                            message={parseInt(decrypted)}
                          />
                          <EccSummary />
                        </>
                      )}
                    </>
                  );
                } catch (error) {
                  return null;
                }
              })()}
            </div>
          )}
        </section>
      </div>
    </AlgorithmLayout>
  );
}
