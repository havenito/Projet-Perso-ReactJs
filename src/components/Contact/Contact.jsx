import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import emailjs from "emailjs-com";
import "./Contact.scss";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    try {
      console.log("Sending email with params:", templateParams);
      const response = await emailjs.send(
        "service_bzb6ghb",
        "template_a5wxw18",
        templateParams,
        "NnPZUILSJg-KYKuCV"
      );
      console.log("Email sent successfully:", response);

      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Erreur lors de l'envoi du formulaire");
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [submitted, navigate]);

  return (
    <div className="contact-container flex justify-center items-center min-h-screen bg-gray-800 p-10">
      {submitted ? (
        <div className="confirmation text-center bg-gray-700 p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-yellow-400">Merci, {name}!</h2>
          <p className="text-gray-400">Votre message a été envoyé avec succès.</p>
        </div>
      ) : (
        <form className="contact-form w-full max-w-lg bg-gray-700 p-8 rounded-xl shadow-xl" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-center text-white mb-6">Contactez-nous</h2>
          {error && <p className="error text-red-400 text-center mb-4">{error}</p>}
          <div className="form-group mb-4">
            <label htmlFor="name" className="text-lg text-white">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="text-lg text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="message" className="text-lg text-white">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}