interface MessagePaddingProps {
  message: string;
}

export default function ShaMessagePadding({ message }: MessagePaddingProps) {
  const binaryMessage = message
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  const messageLength = binaryMessage.length;

  const k = 512 - ((messageLength + 1 + 64) % 512);
  const paddedMessage =
    binaryMessage +
    "1" +
    "0".repeat(k) +
    messageLength.toString(2).padStart(64, "0");

  const blocks: string[] = [];
  for (let i = 0; i < paddedMessage.length; i += 512) {
    blocks.push(paddedMessage.slice(i, i + 512));
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#1A1D24] border border-violet-500/30 rounded space-y-4">
        <h3 className="text-lg font-medium text-white">
          1. Message Padding and Blocking
        </h3>

        {/* Original Message */}
        <div className="space-y-1">
          <div className="text-sm text-white/60">Original Message:</div>
          <div className="font-mono text-violet-400 break-all bg-[#131619] p-2 rounded">
            {message}
          </div>
        </div>

        {/* Binary Representation */}
        <div className="space-y-1">
          <div className="text-sm text-white/60">Binary Message:</div>
          <div className="font-mono text-violet-400 break-all bg-[#131619] p-2 rounded">
            {binaryMessage}
            <span className="text-white/40">
              {" "}
              ({binaryMessage.length} bits)
            </span>
          </div>
        </div>

        {/* Padded Message */}
        <div className="space-y-1">
          <div className="text-sm text-white/60">After Padding:</div>
          <div className="font-mono text-xs text-violet-400 break-all bg-[#131619] p-2 rounded">
            <span>{binaryMessage}</span>
            <span className="text-green-400">1</span>
            <span className="text-blue-400">{"0".repeat(k)}</span>
            <span className="text-yellow-400">
              {messageLength.toString(2).padStart(64, "0")}
            </span>
          </div>
        </div>

        {/* Message Blocks */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">512-bit Blocks:</div>
          {blocks.map((block, index) => (
            <div
              key={index}
              className="font-mono text-xs text-violet-400 break-all bg-[#131619] p-2 rounded"
            >
              Block {index + 1}: {block}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
