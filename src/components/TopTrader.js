import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TopTrader() {
  const [ratio, setRatio] = useState(null);

  useEffect(() => {
    // 当前使用模拟数据，可替换为真实接口
    // 例如：https://www.okx.com/api/v5/public/position-ratio?instType=SWAP&ccy=BTC
    const simulatedRatio = (Math.random() * 3).toFixed(2); // 比如 1.25
    setRatio(simulatedRatio);
  }, []);

  return (
    <div>
      <h2>📊 Top Trader 多空持仓比</h2>
      <p>BTC 持仓多空比：{ratio ? `${ratio} : 1` : "加载中..."}</p>
    </div>
  );
}
