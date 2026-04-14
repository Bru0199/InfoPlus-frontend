"use client";

import React from "react";
import { Cloud, TrendingUp, Flag, Droplets, Wind, AlertCircle } from "lucide-react";

function isWeatherData(data: any): data is { name?: string; weather?: { main?: string }[]; main?: { temp?: number; humidity?: number }; wind?: { speed?: number } } {
  return data && typeof data === "object" && !data.error && data.main && Array.isArray(data.weather) && data.weather.length > 0;
}

// 1. WEATHER CARD
export const WeatherCard = ({ data }: { data: any }) => {
  const errorMsg = typeof data === "string" ? data : data?.error;
  if (errorMsg || !isWeatherData(data)) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 p-4 rounded-2xl max-w-[280px] flex items-start gap-2">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
        <p className="text-sm">{errorMsg || "Weather data unavailable."}</p>
      </div>
    );
  }
  const name = data.name ?? "—";
  const main = data.weather?.[0]?.main ?? "";
  const temp = Number(data.main?.temp);
  const humidity = data.main?.humidity ?? "—";
  const wind = data.wind?.speed ?? "—";
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-3xl shadow-lg w-full max-w-[280px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-blue-100 text-xs">{main}</p>
        </div>
        <Cloud className="h-8 w-8 text-white/80" />
      </div>
      <div className="my-4">
        <span className="text-5xl font-black">{Number.isFinite(temp) ? Math.round(temp) : "—"}°</span>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-white/20 pt-3 text-[10px]">
        <div className="flex items-center gap-1">
          <Droplets size={12} /> {humidity}%
        </div>
        <div className="flex items-center gap-1">
          <Wind size={12} /> {wind}m/s
        </div>
      </div>
    </div>
  );
};

// 2. STOCK CARD
export const StockCard = ({ data }: { data: any }) => {
  const errorMsg = typeof data === "string" ? data : data?.error;
  const valid = data && typeof data === "object" && !data.error && typeof data.close === "number";
  if (errorMsg || !valid) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 p-4 rounded-2xl max-w-[280px] flex items-start gap-2">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
        <p className="text-sm">{errorMsg || "Stock data unavailable."}</p>
      </div>
    );
  }
  const isPositive = (data.change ?? 0) >= 0;
  return (
    <div className="bg-white dark:bg-zinc-900 border border-[var(--border)] p-5 rounded-3xl shadow-md w-full max-w-[280px]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-zinc-400">{data.code ?? "—"}</span>
        <TrendingUp size={16} className={isPositive ? "text-green-500" : "text-red-500"} />
      </div>
      <div className="text-3xl font-black text-[var(--text-main)] mb-1">
        ${Number(data.close).toFixed(2)}
      </div>
      <div className={`text-xs font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "+" : ""}{data.change_p ?? 0}%
      </div>
    </div>
  );
};

// 3. F1 MATCH CARD
export const F1Card = ({ data }: { data: any }) => {
  const errorMsg = typeof data === "string" ? data : data?.error;
  const valid = data && typeof data === "object" && !data.error && data.raceName;
  if (errorMsg || !valid) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 p-4 rounded-2xl max-w-[300px] flex items-start gap-2">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
        <p className="text-sm">{errorMsg || "F1 data unavailable."}</p>
      </div>
    );
  }
  const circuitName = data.Circuit?.circuitName ?? "—";
  const dateStr = data.date ? new Date(data.date).toLocaleDateString() : "—";
  const qualTime = data.Qualifying?.time ?? "—";
  return (
    <div className="bg-zinc-950 text-white p-5 rounded-3xl shadow-2xl border-l-4 border-red-600 w-full max-w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <Flag size={16} className="text-red-600" />
        <span className="text-[10px] font-black tracking-widest uppercase text-zinc-400">Next Grand Prix</span>
      </div>
      <h3 className="text-lg font-black leading-tight mb-1">{data.raceName}</h3>
      <p className="text-xs text-zinc-400 mb-4">{circuitName}</p>
      <div className="bg-zinc-900 rounded-2xl p-3">
        <div className="flex justify-between text-[11px] mb-2">
          <span className="text-zinc-500">Race Date</span>
          <span className="font-bold">{dateStr}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-500">Qualifying</span>
          <span className="font-bold">{qualTime}</span>
        </div>
      </div>
    </div>
  );
};