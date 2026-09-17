import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

const initialForm = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("missing-config");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(serviceId, templateId, form, publicKey);
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const statusMessage = {
    "missing-config": "Configure o EmailJS no arquivo .env para ativar o envio.",
    success: "Mensagem enviada. Obrigado pelo contato.",
    error: "Não foi possível enviar agora. Tente novamente em instantes.",
  }[status];

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Seu nome<input required name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Como podemos chamar você?" /></label>
      <label>Email<input required type="email" name="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="voce@empresa.com" /></label>
      <label>Mensagem<textarea required name="message" rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Conte um pouco sobre o projeto..." /></label>
      <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Enviar mensagem"} <Send size={16} /></button>
      {statusMessage && <p className={`form-status ${status === "error" ? "is-error" : ""}`} role={status === "error" ? "alert" : "status"}>{statusMessage}</p>}
    </form>
  );
}
