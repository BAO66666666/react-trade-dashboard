import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import computeMA5RSI from "./utils/indicators";
import TopTrader from "./components/TopTrader";

function App() {
  const [btcData, setBtcData] = useState(null);
  const [ethData, setEthData] = useState(null);
  const [altcoins, setAltcoins] = useState([]);
  const [prices, setPrices] = useState({});
  const [recs, setRecs] = useState(null);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const ts = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
    setTimestamp(`数据更新：${ts}`);

    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")
      .then(res => {
        setBtcData(res.data.bitcoin);
        setEthData(res.data.ethereum);
      });

    axios.get("https://daily-trend-data.onrender.com/recommendations.json")
      .then(res => setRecs(res.data));

    axios.get("https://daily-trend-data.onrender.com/altcoins.json")
      .then(res => setAltcoins(res.data.symbols || ["WIF-USDT-SWAP"]));
  }, []);

  useEffect(() => {
    altcoins.forEach(sym => {
      axios.get(`https://www.okx.com/api/v5/market/ticker?instId=${sym}`)
        .then(res => {
          setPrices(prev => ({ ...prev, [sym]: res.data.data[0]?.last }));
        }).catch(() => {
          setPrices(prev => ({ ...prev, [sym]: "Err" }));
        });
    });
  }, [altcoins]);

  const [ma5Btc, rsi14Btc] = computeMA5RSI("bitcoin");
  const [ma5Eth, rsi14Eth] = computeMA5RSI("ethereum");

  return (
    <div className="container">
      <h1>📊 每日综合交易推荐</h1>
      <p className="timestamp">{timestamp}</p>

      <section className="card">
        <h2>主流币行情 + 技术指标</h2>
        <p>BTC: ${btcData?.usd} &nbsp; MA5: {ma5Btc} &nbsp; RSI14: {rsi14Btc}</p>
        <p>ETH: ${ethData?.usd} &nbsp; MA5: {ma5Eth} &nbsp; RSI14: {rsi14Eth}</p>
      </section>

      <section className="card">
        <h2>✅ 今日推荐策略</h2>
        <pre>{recs?.futures}</pre>
        <pre>{recs?.okxMain}</pre>
        <pre>{recs?.okxAltcoins}</pre>
      </section>

      <section className="card">
        <h2>💎 山寨币实时价格（OKX）</h2>
        <ul>
          {altcoins.map(sym => (
            <li key={sym}>{sym}: {prices[sym] ?? '加载中...'}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>🀄 A股连板分类推荐</h2>
        <pre>{recs?.aStocks}</pre>
      </section>

      <section className="card">
        <TopTrader />
      </section>
    </div>
  );
}

export default App;
