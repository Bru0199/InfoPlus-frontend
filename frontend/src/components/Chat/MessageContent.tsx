"use client";

import React, { useState, useEffect, useMemo } from "react";
import { WeatherCard, StockCard, F1Card } from "./ToolCards";

export const MessageContent = ({ content }: { content: any[] }) => {
  const displayItems = useMemo(
    () => (Array.isArray(content) ? content.filter((item: any) => item.type !== "tool-call") : []),
    [content]
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      {displayItems.map((item, index) => {
        // Handle Normal Text with streaming effect
        if (item.type === "text") {
          return <StreamingText key={index} text={item.text} />;
        }

        // Handle Tool Results
        if (item.type === "tool-result") {
          const toolData = item.output?.value ?? item.output;
          if (toolData === undefined || toolData === null) {
            return (
              <p key={index} className="text-sm text-amber-600 dark:text-amber-400">
                No data returned.
              </p>
            );
          }
          switch (item.toolName) {
            case "getWeather":
              return <WeatherCard key={index} data={toolData} />;
            case "getStockPrice":
              return <StockCard key={index} data={toolData} />;
            case "getF1Matches":
              return <F1Card key={index} data={toolData} />;
            default:
              return null;
          }
        }
        return null;
      })}
    </div>
  );
};

const StreamingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [text]);
  return <div className="text-inherit">{displayedText}</div>;
};