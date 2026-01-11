import React, { useState } from "react";

const WordSearch = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!word) return;
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error("Word not found");
      const data = await res.json();
      // API 구조에서 첫 번째 뜻과 예문만 가져오기
      const meaning = data[0].meanings[0].definitions[0].definition;
      const example = data[0].meanings[0].definitions[0].example || "No example available";
      setDefinition({ meaning, example });
      setError("");
    } catch (err) {
      setError(err.message);
      setDefinition(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>영어 단어 검색</h2>
      <input
        type="text"
        placeholder="단어 입력"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "8px 12px" }}>
        검색
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {definition && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>뜻:</strong> {definition.meaning}</p>
          <p><strong>예문:</strong> {definition.example}</p>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
