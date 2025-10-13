import React, { useState } from "react";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`http://localhost:5050/api/search?q=${query}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();
      setResults(data.results || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🔍 Search Documents
      </h2>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keyword..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Results ({results.length}):</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((doc, idx) => (
              <li
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                <strong>{doc.filename}</strong>
                <p style={{ color: "#555" }}>
                  {doc.text_content.substring(0, 200)}...
                </p>
                <small>📅 Uploaded: {new Date(doc.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
