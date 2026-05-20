import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ fontFamily: "Arial", padding: "40px" }}>
      {data && (
        <div>
          <p>{data.message}</p>
          <p>Gespeicherte Nachrichten: {data.savedMessages}</p>
        </div>
      )}

      {error && <p>Fehler: {error}</p>}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);