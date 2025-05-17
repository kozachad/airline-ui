// src/SimpleBotResponse.js
import React from "react";

function SimpleBotResponse({ data }) {
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch {
    return <div>{data}</div>; // JSON değilse düz yazı göster
  }

  // Eğer `result` varsa ve içinde checkin bilgisi vs varsa
  if (parsed.result) {
    const { passengerName, seatNumber, isCheckedIn } = parsed.result;
    return (
      <div>
        ✅ <strong>{passengerName}</strong> has been {isCheckedIn ? "checked in" : "not checked in"}.
        <br />
        🪑 Seat Number: <strong>{seatNumber}</strong>
      </div>
    );
  }

  // Eğer hata varsa
  if (parsed.error) {
    return (
      <div style={{ color: "red" }}>
        ❌ <strong>Error:</strong> {parsed.error} <br />
        ℹ️ {parsed.details}
      </div>
    );
  }

  // Diğer JSON türleri için fallback
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
}

export default SimpleBotResponse;
