import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RoundData {
  round: number;
  R: number;
  L: number;
  f: number;
}

interface FeistelNetworkProps {
  rounds?: number;
}

function feistelFunction(input: number, key: number): number {
  return (input ^ key) & 0xff;
}

function calculateFeistelNetwork(
  rounds: number,
  inputLeft: number,
  inputRight: number,
  keys: number[]
): RoundData[] {
  const result: RoundData[] = [];
  let L = inputLeft;
  let R = inputRight;

  for (let i = 0; i < rounds; i++) {
    const fValue = feistelFunction(R, keys[i]);
    const newL = R;
    const newR = L ^ fValue;

    result.push({
      round: i + 1,
      R: newR,
      L: newL,
      f: fValue,
    });

    L = newL;
    R = newR;
  }

  return result;
}

export default function FeistelNetwork({ rounds = 3 }: FeistelNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [inputLeft, setInputLeft] = useState("");
  const [inputRight, setInputRight] = useState("");
  const [roundData, setRoundData] = useState<RoundData[]>([]);

  const handleCalculate = () => {
    const left = parseInt(inputLeft, 16) || 0;
    const right = parseInt(inputRight, 16) || 0;
    const keys = Array(rounds)
      .fill(0)
      .map((_, i) => 0x11 * (i + 1));
    const data = calculateFeistelNetwork(rounds, left, right, keys);
    setRoundData(data);
  };

  useEffect(() => {
    if (!svgRef.current || roundData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const radium = 10;
    const boxWidth = 60;
    const boxHeight = 40;
    const verticalGap = 150; // box height + 110
    const horizontalGap = 100; // box width + 40

    // 绘制初始输入
    // Left input box
    g.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", boxWidth)
      .attr("height", boxHeight)
      .attr("rx", 4)
      .attr("class", "fill-[#1A1D24] stroke-violet-500/50");

    g.append("text")
      .attr("x", boxWidth / 2)
      .attr("y", boxHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("class", "fill-white text-sm")
      .text(`0x${inputLeft.toUpperCase() || "00"}`);

    // Right input box
    g.append("rect")
      .attr("x", boxWidth + 40)
      .attr("y", 0)
      .attr("width", boxWidth)
      .attr("height", boxHeight)
      .attr("rx", 4)
      .attr("class", "fill-[#1A1D24] stroke-violet-500/50");

    g.append("text")
      .attr("x", horizontalGap + boxWidth / 2)
      .attr("y", boxHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("class", "fill-white text-sm")
      .text(`0x${inputRight.toUpperCase() || "00"}`);

    roundData.forEach((data, index) => {
      const y = (index + 1) * verticalGap;

      const startLeft = [boxWidth / 2, y - verticalGap + boxHeight];
      const endLeft = [boxWidth / 2, y];
      const startRight = [
        horizontalGap + boxWidth / 2,
        y - verticalGap + boxHeight,
      ];
      const endRight = [horizontalGap + boxWidth / 2, y];
      const circleF = [
        horizontalGap + boxWidth / 2,
        y - ((verticalGap - boxHeight) * 2) / 3,
      ];
      const circleXor = [
        horizontalGap + boxWidth / 2,
        y - ((verticalGap - boxHeight) * 1) / 3,
      ];

      // Function circle
      g.append("circle")
        .attr("cx", horizontalGap + boxWidth / 2)
        .attr("cy", circleF[1])
        .attr("r", radium)
        .attr("class", "fill-violet-500/20 stroke-violet-500/50");

      g.append("text")
        .attr("x", horizontalGap + boxWidth / 2)
        .attr("y", circleF[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("class", "fill-white text-xs")
        .text(`f${data.round}`);

      // xor circle
      g.append("circle")
        .attr("cx", horizontalGap + boxWidth / 2)
        .attr("cy", circleXor[1])
        .attr("r", radium)
        .attr("class", "fill-violet-500/20 stroke-violet-500/50");

      g.append("text")
        .attr("x", horizontalGap + boxWidth / 2)
        .attr("y", circleXor[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("class", "fill-white text-xs")
        .text(`+`);

      // Left output box
      g.append("rect")
        .attr("x", 0)
        .attr("y", y)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("rx", 4)
        .attr("class", "fill-[#1A1D24] stroke-violet-500/50");

      g.append("text")
        .attr("x", boxWidth / 2)
        .attr("y", y + boxHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("class", "fill-white text-sm")
        .text(`0x${data.L.toString(16).toUpperCase()}`);

      // Right output box
      g.append("rect")
        .attr("x", horizontalGap)
        .attr("y", y)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("rx", 4)
        .attr("class", "fill-[#1A1D24] stroke-violet-500/50");

      g.append("text")
        .attr("x", horizontalGap + boxWidth / 2)
        .attr("y", y + boxHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("class", "fill-white text-sm")
        .text(`0x${data.R.toString(16).toUpperCase()}`);

      // Connection lines
      g.append("path")
        .attr(
          "d",
          `
          M ${startLeft[0]} ${startLeft[1]}
          C ${startLeft[0]} ${startLeft[1]},
          ${startLeft[0]} ${circleXor[1]},
          ${circleXor[0]} ${circleXor[1]}

          M ${startRight[0]} ${startRight[1]}
          V ${endRight[1]}

          M ${startRight[0]} ${startRight[1]}
          C ${startRight[0]} ${startRight[1]},
          ${startLeft[0]} ${circleF[1]},
          ${endLeft[0]} ${endLeft[1]}
        `
        )
        .attr("class", "stroke-violet-500/50 fill-none");
    });
  }, [roundData, inputLeft, inputRight]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="space-y-2">
          <label htmlFor="leftInput" className="block text-sm text-white/60">
            Left Input (hex)
          </label>
          <input
            id="leftInput"
            type="text"
            value={inputLeft}
            onChange={(e) => setInputLeft(e.target.value)}
            placeholder="e.g., C5"
            maxLength={2}
            className="px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="rightInput" className="block text-sm text-white/60">
            Right Input (hex)
          </label>
          <input
            id="rightInput"
            type="text"
            value={inputRight}
            onChange={(e) => setInputRight(e.target.value)}
            placeholder="e.g., CE"
            maxLength={2}
            className="px-3 py-2 bg-[#1A1D24] border border-violet-500/30 rounded text-white/80 focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="calculateButton"
            className="block text-sm text-white/60 invisible"
          >
            Calculate button
          </label>
          <button
            onClick={handleCalculate}
            className="px-3 py-2 bg-violet-500/20 border border-violet-500/30 rounded text-white/80 hover:bg-violet-500/20 focus:outline-none focus:border-violet-500"
          >
            Calculate
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          ref={svgRef}
          width="400"
          height={40 + roundData.length * 150 + 40}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
