// src/FlightList.js
import React from "react";

function FlightList({ data }) {
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (e) {
    return <pre>{data}</pre>;
  }

  // 🧾 Eğer check-in sonucu dönerse
  if (parsed?.result?.isCheckedIn && parsed?.result?.seatNumber) {
    return (
      <div style={{ background: "#f6ffed", padding: "10px", borderRadius: "8px" }}>
        🛫 <strong>Check-in completed!</strong><br />
        Passenger: <strong>{parsed.result.passengerName}</strong><br />
        Seat Number: <strong>{parsed.result.seatNumber}</strong><br />
        ✅ You are successfully checked in. Have a nice flight!
      </div>
    );
  }

  // 🎫 Bilet alındıysa
  if (parsed?.status === "Ticket purchased") {
    return (
      <div style={{ background: "#e6f7ff", padding: "10px", borderRadius: "8px" }}>
        ✅ <strong>Ticket purchased successfully!</strong>
      </div>
    );
  }

  // ✈️ Uçuş listesi varsa
  if (Array.isArray(parsed) && parsed.length > 0) {
    return (
      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "8px" }}>
        <div style={{ marginBottom: "10px" }}>
          ✈️ <strong>Here are your flight options:</strong>
        </div>
        {parsed.map((flight, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <strong>{i + 1}.</strong> Flight ID: {flight.id}, From <strong>{flight.airportFrom}</strong> → <strong>{flight.airportTo}</strong><br />
            Time: {new Date(flight.dateFrom).toLocaleString()} – Duration: {flight.duration} mins<br />
            Available Seats: {flight.availableSeats}
          </div>
        ))}
      </div>
    );
  }

  // ✈️ Hiçbir şey yoksa
  return <div>No flights found or unknown response format.</div>;
}

export default FlightList;
