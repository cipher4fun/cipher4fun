export class RSA {
  static modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
      if (exponent % 2n === 1n) {
        result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
      exponent = exponent / 2n;
    }
    return result;
  }

  static encrypt(message: string, e: bigint, n: bigint): string {
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(message);
    const m = BigInt(
      "0x" +
        Array.from(messageBytes)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("")
    );

    const c = this.modPow(m, e, n);
    return c.toString(16);
  }

  static decrypt(ciphertext: string, d: bigint, n: bigint): string {
    const c = BigInt("0x" + ciphertext);
    const m = this.modPow(c, d, n);

    const hex = m.toString(16);
    const bytes = new Uint8Array(
      hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );

    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  }

  static isPrime(n: bigint): boolean {
    if (n <= 1n) return false;
    if (n <= 3n) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;

    for (let i = 5n; i * i <= n; i += 6n) {
      if (n % i === 0n || n % (i + 2n) === 0n) return false;
    }
    return true;
  }

  static generatePrime(min: bigint, max: bigint): bigint {
    while (true) {
      const range = max - min + 1n;
      const random = BigInt(Math.floor(Math.random() * Number(range)));
      const num = min + random;

      if (this.isPrime(num)) {
        return num;
      }
    }
  }

  static generatePrimePair(): { p: bigint; q: bigint } {
    const min = 100000000n;
    const max = 999999999n;

    const p = this.generatePrime(min, max);
    let q;
    do {
      q = this.generatePrime(min, max);
    } while (q === p);

    return { p, q };
  }

  static debug(
    message: string,
    e: bigint,
    n: bigint
  ): {
    messageHex: string;
    m: bigint;
    c: bigint;
    steps: string[];
  } {
    const steps: string[] = [];

    // 1. 转换消息为数字
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(message);
    const messageHex = Array.from(messageBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    steps.push(`Message bytes (hex): ${messageHex}`);

    // 2. 转换为 BigInt
    const m = BigInt("0x" + messageHex);
    steps.push(`Message as number (m): ${m}`);

    // 3. 检查是否小于 n
    steps.push(`Modulus (n): ${n}`);
    if (m >= n) {
      steps.push("WARNING: Message is larger than modulus!");
    }

    // 4. 加密
    const c = this.modPow(m, e, n);
    steps.push(`Encrypted (c = m^e mod n): ${c}`);

    return { messageHex, m, c, steps };
  }

  static extendedGCD(a: bigint, b: bigint): [bigint, bigint, bigint] {
    if (b === 0n) {
      return [a, 1n, 0n];
    }
    const [gcd, x1, y1] = this.extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - (a / b) * y1;
    return [gcd, x, y];
  }

  static modInverse(e: bigint, phi: bigint): bigint {
    const [gcd, x] = this.extendedGCD(e, phi);
    if (gcd !== 1n) {
      throw new Error("Inverse does not exist");
    }
    return ((x % phi) + phi) % phi;
  }
}
