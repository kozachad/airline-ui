import SimpleBotResponse from "./SimpleBotResponse";
import FlightList from "./FlightList";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      console.log(msgs,"BEN BURDAYIM")
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text,
      sender: "user",
      timestamp: serverTimestamp()
    });

    setText("");
  };

  return (
    <div style={{
      padding: "40px",
      maxWidth: "900px",
      margin: "auto",
      fontFamily: "Segoe UI, sans-serif",
      fontSize: "18px"
    }}>
      <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "30px" }}>
        ✈️ <strong>Flight Chat Bot</strong>
      </h1>

      <div style={{
        marginBottom: "30px",
        minHeight: "500px",
        background: "#f1f1f1",
        padding: "25px",
        borderRadius: "12px",
        overflowY: "auto",
        maxHeight: "600px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "20px" }}>
            <div style={{
                background: "#d6f3ff",
                padding: "15px 20px",
                borderRadius: "10px",
                textAlign: "right",
                marginLeft: "200px"
              }}>
                <strong>🧑 You:</strong> {msg.text}
              </div>
            {msg.response && (
              <div style={{
                background: "#ffffff",
                padding: "15px 20px",
                borderRadius: "10px",
                textAlign: "left",
                marginRight: "200px",
                marginTop: "5px",
                border: "1px solid #ccc"
              }}>
                <strong>🤖 Bot:</strong>{" "}
                {msg.response.startsWith("[") || msg.response.startsWith("{") ? (
                  <FlightList data={msg.response} />
                ) : (
                  <SimpleBotResponse data={msg.response} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          value={text}
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "15px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "15px"
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "15px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
