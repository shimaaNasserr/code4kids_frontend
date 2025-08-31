import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // {sender: 'user'|'bot', text, data}

  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text, data: null }]);
    setInput("");

    try {
      const payload = { message: text };
      const res = await axios.post("http://localhost:8000/api/chatbot/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "رد البوت فارغ", data: data.data || null },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "حصل خطأ، جرّب تاني.", data: null },
      ]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* زرار فتح/إغلاق الشات */}
      <button
        type="button"
        className="btn btn-warning position-fixed"
        style={{ right: 20, bottom: 20, zIndex: 9999, borderRadius: "50px", padding: "10px 20px" }}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close ✖" : "Chatbot 💬 "}
      </button>

      {open && (
        <div
          className="card shadow position-fixed"
          style={{
            width: 360,
            height: 520,
            right: 20,
            bottom: 80,
            zIndex: 9999,
            borderRadius: 16,
          }}
        >
          <div className="card-header bg-danger text-white fw-bold">مساعد الكورسات</div>

          <div
            className="card-body"
            style={{ overflowY: "auto", background: "#fffaf0" }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`d-flex mb-3 ${
                  m.sender === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded-3 ${
                    m.sender === "user" ? "bg-danger text-white" : "bg-light text-muted"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  <div className="small">{m.text}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* input + زرار الإرسال */}
          <div className="card-footer bg-white border-0">
            <form onSubmit={onSubmit} className="d-flex gap-2 align-items-center">
              <input
                className="form-control rounded-pill"
                placeholder="اكتب سؤالك..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                type="submit"
                style={{ width: "42px", height: "42px" }}
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
