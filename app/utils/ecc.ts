export interface Point {
  x: bigint;
  y: bigint;
}

interface CurveParams {
  a: bigint;
  b: bigint;
  p: bigint;
  G: Point;
  n: bigint; // 基点的阶
}

export class ECC {
  private params: CurveParams;

  constructor(params: CurveParams) {
    this.params = params;
    if (!this.isOnCurve(params.G)) {
      throw new Error("Base point G is not on the curve!");
    }
  }

  // 模运算
  private mod(n: bigint): bigint {
    return ((n % this.params.p) + this.params.p) % this.params.p;
  }

  // 模逆元
  private modInverse(a: bigint): bigint {
    let t = BigInt(0),
      newT = BigInt(1);
    let r = this.params.p,
      newR = a;

    while (newR !== BigInt(0)) {
      const quotient = r / newR;
      [t, newT] = [newT, t - quotient * newT];
      [r, newR] = [newR, r - quotient * newR];
    }

    return this.mod(t);
  }

  // 点加法
  private addPoints(P: Point | null, Q: Point | null): Point | null {
    if (!P) return Q;
    if (!Q) return P;

    if (P.x === Q.x && P.y === Q.y) {
      if (P.y === BigInt(0)) return null;

      // 计算斜率
      const numerator = this.mod(BigInt(3) * P.x * P.x + this.params.a);
      const denominator = this.mod(BigInt(2) * P.y);
      const lambda = this.mod(numerator * this.modInverse(denominator));

      const x = this.mod(lambda * lambda - BigInt(2) * P.x);
      const y = this.mod(lambda * (P.x - x) - P.y);

      return { x, y };
    } else if (P.x === Q.x) {
      return null;
    } else {
      const lambda = this.mod((Q.y - P.y) * this.modInverse(Q.x - P.x));
      const x = this.mod(lambda * lambda - P.x - Q.x);
      const y = this.mod(lambda * (P.x - x) - P.y);

      return { x, y };
    }
  }

  // 标量乘法
  private multiply(P: Point | null, n: number): Point | null {
    if (!P) return null;
    let Q: Point | null = null;
    let R: Point | null = P;

    // 直接使用 BigInt 进行所有运算
    let nBig = this.mod(BigInt(n));

    while (nBig > BigInt(0)) {
      if (nBig & BigInt(1)) {
        Q = this.addPoints(Q, R);
      }
      R = this.addPoints(R, R);
      nBig = nBig >> BigInt(1);
    }

    return Q;
  }

  // 验证私钥是否有效
  private isValidPrivateKey(d: bigint): boolean {
    return d > BigInt(0) && d < this.params.n;
  }

  // 计算公钥
  getPublicKey(privateKey: number): Point | null {
    const d = BigInt(privateKey);
    if (!this.isValidPrivateKey(d)) {
      throw new Error(
        `Private key must be between 1 and ${this.params.n - BigInt(1)}`
      );
    }
    return this.multiply(this.params.G, privateKey);
  }

  private generateK(): number {
    // 生成 [1, n-1] 范围内的随机数
    const n = Number(this.params.n);
    let k;
    do {
      k = Math.floor(Math.random() * (n - 1)) + 1;
    } while (k >= n);
    return k;
  }

  // 加密消息
  encrypt(
    message: number,
    publicKey: Point
  ): {
    R: Point;
    S: Point;
    cipher: bigint;
    k: number;
  } {
    if (message < 0 || message >= Number(this.params.p)) {
      throw new Error(
        `Message must be between 0 and ${this.params.p - BigInt(1)}`
      );
    }

    const k = this.generateK();
    console.log(k);

    const R = this.multiply(this.params.G, k)!; // R = kG
    const S = this.multiply(publicKey, k)!; // S = kQ = k(dG)

    const cipher = this.mod(BigInt(message) + S.x);

    return { R, S, cipher, k };
  }

  // 解密消息
  decrypt(R: Point, cipher: bigint, privateKey: number): number {
    const S = this.multiply(R, privateKey)!;
    const m = this.mod(cipher - S.x);

    return Number(m);
  }

  isOnCurve(P: Point): boolean {
    const { x, y } = P;
    const left = this.mod(y * y);
    const right = this.mod(x * x * x + this.params.a * x + this.params.b);
    return left === right;
  }
}
