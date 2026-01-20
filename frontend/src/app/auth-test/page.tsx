"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AuthTestPage() {
  const [status, setStatus] = useState("Checking...");
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [cookies, setCookies] = useState<string>("");

  const checkAuth = async () => {
    setStatus("Checking authentication...");
    setError(null);
    
    try {
      console.log("Making request to /auth/me");
      const response = await api.get("/auth/me");
      
      console.log("Response:", response);
      setStatus("✅ LOGGED IN");
      setUserData(response.data);
    } catch (err: any) {
      console.error("Auth check error:", err);
      setStatus("❌ NOT LOGGED IN");
      setError({
        status: err.response?.status,
        message: err.response?.data?.message || err.message,
        data: err.response?.data,
      });
    }
    
    // Check cookies
    setCookies(document.cookie || "No cookies found");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Authentication Test</h1>
        
        <div className="bg-[var(--bg-muted)] p-6 rounded-lg border border-[var(--border)]">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>
          
          <button
            onClick={checkAuth}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Recheck Authentication
          </button>
        </div>

        {userData && (
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-500">
            <h3 className="text-lg font-semibold mb-2">✅ User Data:</h3>
            <pre className="overflow-auto text-sm">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-500">
            <h3 className="text-lg font-semibold mb-2">❌ Error Details:</h3>
            <p><strong>Status Code:</strong> {error.status}</p>
            <p><strong>Message:</strong> {error.message}</p>
            <pre className="overflow-auto text-sm mt-2">
              {JSON.stringify(error.data, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-[var(--bg-muted)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-2">🍪 Browser Cookies:</h3>
          <pre className="overflow-auto text-sm bg-black/10 p-4 rounded">
            {cookies}
          </pre>
        </div>

        <div className="bg-[var(--bg-muted)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-2">⚙️ Configuration:</h3>
          <p><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL}</p>
          <p><strong>With Credentials:</strong> true</p>
          <p><strong>Current URL:</strong> {typeof window !== "undefined" ? window.location.href : ""}</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-500">
          <h3 className="text-lg font-semibold mb-2">📋 Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>First, go to <a href="/login" className="text-blue-500 underline">/login</a> and sign in with Google</li>
            <li>After successful login, come back to this page</li>
            <li>Click "Recheck Authentication" to test</li>
            <li>Check if cookies are being set in your browser (DevTools → Application → Cookies)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
