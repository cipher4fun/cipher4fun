import { useState } from "react";

interface Point {
  x: bigint;
  y: bigint;
}

interface Props {
  privateKey: number;
  basePoint: Point;
  publicKey: Point;
}

export default function EccPublicKeyGeneration({
  privateKey,
  basePoint,
  publicKey,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);

  // 将私钥转换为二进制表示
  const binaryKey = privateKey.toString(2).padStart(8, "0");

  return (
    <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
      <h3 className="text-lg text-white">1. Public Key Generation</h3>

      <div className="space-y-2">
        <p className="text-white/80">
          In ECC, the public key Q is generated by multiplying the base point G
          by the private key d (scalar multiplication).
        </p>

        <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
          <div className="font-mono text-sm">
            <div>d = {privateKey}</div>
            <div>
              G = ({basePoint.x.toString()}, {basePoint.y.toString()})
            </div>
            <div>Q = dG</div>
            <div>
              Q = ({publicKey.x.toString()}, {publicKey.y.toString()})
            </div>
          </div>
        </div>

        <div className="text-white/80">
          The scalar multiplication is performed using the double-and-add
          algorithm based on the binary representation of d:
        </div>

        <div className="font-mono text-xs bg-[#131619] p-3 rounded text-violet-400">
          <div className="font-mono text-sm">
            d = {privateKey} = {binaryKey}₂
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/30 focus:outline-none"
        >
          {showDetails ? "Hide" : "Show"} Double-and-Add Steps
        </button>

        {showDetails && (
          <div className="font-mono bg-[#131619] p-3 rounded text-violet-400">
            <div className="text-sm text-white/70">
              For each bit from left to right:
              <ol className="list-decimal list-inside mt-2 space-y-1">
                {binaryKey.split("").map((bit, i) => (
                  <li key={i} className="text-violet-400/90">
                    Bit {i + 1}: {bit} →{" "}
                    {bit === "1"
                      ? "Double current point and add G"
                      : "Double current point"}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
