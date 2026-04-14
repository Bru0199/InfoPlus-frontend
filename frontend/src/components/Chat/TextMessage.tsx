"use client";

import React, { useState, useEffect, useMemo } from "react";

export const hasTextType = (content: any) => {
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    return (
      Array.isArray(parsed) && parsed.some((item: any) => item.type === "text")
    );
  } catch {
    return false;
  }
};

// export const TextMessage = ({ content }: { content: any }) => {
//   const [displayedText, setDisplayedText] = useState("");

//   // 1. Memoize the extraction so it only runs when content changes
//   const rawText = useMemo(() => {
//     try {
//       const parsed =
//         typeof content === "string" ? JSON.parse(content) : content;

//       if (Array.isArray(parsed)) {
//         // ONLY pick the object where type is "text"
//         const textObj = parsed.find((item: any) => item.type === "text");
//         return textObj ? textObj.text : null;
//       }
//       return null;
//     } catch (e) {
//       return null;
//     }
//   }, [content]);

//   // 2. Typing Effect
//   useEffect(() => {
//     if (!rawText) return;

//     let i = 0;
//     const speed = 10;
//     setDisplayedText("");

//     const interval = setInterval(() => {
//       setDisplayedText(rawText.slice(0, i));
//       i++;
//       if (i > rawText.length) clearInterval(interval);
//     }, speed);

//     return () => clearInterval(interval);
//   }, [rawText]);

//   // If no text type was found, render nothing
//   if (!rawText) return null;

//   return (
//     <div className="leading-relaxed whitespace-pre-wrap transition-opacity duration-300">
//       {displayedText}
//     </div>
//   );
// };

export const TextMessage = React.memo(function TextMessage({
  content,
  isLast,
}: {
  content: any;
  isLast?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");

  const rawText = useMemo(() => {
    if (content == null) return null;
    if (typeof content === "string") {
      if (content.length === 0) return null;
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          const textObj = parsed.find((item: any) => item.type === "text");
          return textObj ? textObj.text : null;
        }
      } catch {
        // Plain text from backend
      }
      return content;
    }
    if (typeof content === "object" && Array.isArray(content)) {
      const textObj = content.find((item: any) => item.type === "text");
      return textObj ? textObj.text : null;
    }
    return null;
  }, [content]);

  useEffect(() => {
    if (!rawText) return;

    // IF NOT THE LAST MESSAGE (HISTORY): Show instantly
    if (!isLast) {
      setDisplayedText(rawText);
      return;
    }

    // IF THE LAST MESSAGE (NEW): Type it out (16ms ≈ 60fps, fewer re-renders)
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(rawText.slice(0, i));
      i++;
      if (i > rawText.length) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [rawText, isLast]);

  if (!rawText) return null;
  return (
    <div className="leading-relaxed whitespace-pre-wrap">{displayedText}</div>
  );
});
