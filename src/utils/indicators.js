// 模拟计算 MA5 与 RSI14（实际项目可替换成真实算法或 API 返回值）

export default function computeMA5RSI(symbol = "bitcoin") {
  const ma5 = (Math.random() * 1000 + 20000).toFixed(2);  // 假设 BTC 在 2 万以上
  const rsi14 = (Math.random() * 100).toFixed(2);         // RSI 正常在 0-100 之间
  return [ma5, rsi14];
}
