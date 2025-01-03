export default function ShaInitialHash() {
  // 初始哈希值（前8个质数的平方根小数部分的前32位）
  const initialHash = [
    0x6a09e667, // sqrt(2)
    0xbb67ae85, // sqrt(3)
    0x3c6ef372, // sqrt(5)
    0xa54ff53a, // sqrt(7)
    0x510e527f, // sqrt(11)
    0x9b05688c, // sqrt(13)
    0x1f83d9ab, // sqrt(17)
    0x5be0cd19, // sqrt(19)
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">
          2. Initialize Hash Values
        </h3>

        {/* Description */}
        <div className="text-sm text-white/80">
          Initialize hash values using the first 32 bits of the fractional parts
          of the square roots of the first 8 primes.
        </div>

        {/* Initial Hash Values */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">
            Initial Hash Values (H0-H7):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {initialHash.map((value, index) => (
              <div
                key={index}
                className="font-mono text-xs bg-[#131619] p-2 rounded flex items-center justify-between"
              >
                <span className="text-white/60">H{index}</span>
                <span className="text-violet-400">
                  {value.toString(16).padStart(8, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prime Numbers and Square Roots */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Derivation:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[2, 3, 5, 7, 11, 13, 17, 19].map((prime) => (
              <div
                key={prime}
                className="font-mono text-xs bg-[#131619] p-2 rounded flex items-center justify-between"
              >
                <span className="text-white/60">√{prime}</span>
                <span className="text-violet-400">
                  {Math.sqrt(prime).toString().slice(2, 10)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
