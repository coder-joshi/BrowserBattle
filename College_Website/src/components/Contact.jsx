import React, { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        try {
            const response = await fetch("http://localhost:5001/api/contact", { // <-- Changed to 5001
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
});
            const data = await response.json();
            if (response.ok) {
                setStatus("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("Failed to send: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("Failed to connect to the server.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm text-black bg-white min-h-screen py-16">
            <p className="text-xs bg-gray-100 text-black font-medium px-3 py-1 rounded-full">Contact Us</p> 
            <h1 className="text-4xl font-bold py-4 text-center">Let's Get In Touch.</h1>
            <p className="max-md:text-sm text-gray-500 pb-10 text-center">
                Or reach out to the Codeathon organizers: Rahul H (6361305021) or Channabasavanna (7676975495)
            </p>
            
            <div className="max-w-96 w-full px-4">
                <label htmlFor="name" className="font-medium">Full Name</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-black transition-all">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name" required />
                </div>
        
                <label htmlFor="email" className="font-medium mt-4">Email Address</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-black transition-all">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address" required />
                </div>
        
                <label htmlFor="message" className="font-medium mt-4">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full mt-2 p-2 bg-transparent border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-black transition-all" placeholder="Enter your message" required></textarea>
                
                <button type="submit" className="mt-5 bg-black hover:bg-gray-800 text-white py-2.5 w-full rounded-full transition">
                    Submit Form
                </button>

                {status && <p className="mt-4 text-center font-medium">{status}</p>}
            </div>
        </form>
    );
}