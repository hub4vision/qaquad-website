"use client";
import { useState, useEffect } from "react";

function formatInr(val: number) {
  if (val >= 100000) {
    const lakhs = val / 100000;
    return Number.isInteger(lakhs) ? `₹${lakhs}L` : `₹${lakhs.toFixed(1)}L`;
  }
  if (val >= 1000) {
    const k = val / 1000;
    return Number.isInteger(k) ? `₹${k}K` : `₹${k.toFixed(1)}K`;
  }
  return `₹${val}`;
}

function formatUsd(val: number, rate: number) {
  const raw = val / rate;
  let rounded;
  if (raw < 1000) rounded = Math.round(raw / 50) * 50;
  else rounded = Math.round(raw / 100) * 100;
  return `$${rounded.toLocaleString()}`;
}

export function DualCurrencyPrice({ 
  minInr, 
  maxInr, 
  suffix = "" 
}: { 
  minInr: number; 
  maxInr?: number | null; 
  suffix?: string;
}) {
  const [usdToInr, setUsdToInr] = useState<number>(83.5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates?.INR) {
          setUsdToInr(data.rates.INR);
        }
      })
      .catch(() => {});
  }, []);

  const inrStr = maxInr ? `${formatInr(minInr)} – ${formatInr(maxInr)}` : `${formatInr(minInr)}`;
  
  const currentRate = mounted ? usdToInr : 83.5;
  const usdStr = maxInr ? `${formatUsd(minInr, currentRate)} – ${formatUsd(maxInr, currentRate)}` : `${formatUsd(minInr, currentRate)}`;

  return (
    <span className="inline-block" suppressHydrationWarning>
      {usdStr} <span className="mx-1 text-slate-500 font-normal">|</span> {inrStr}{suffix}
    </span>
  );
}
