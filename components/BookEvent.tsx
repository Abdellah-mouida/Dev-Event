"use client";

import { constants } from "node:fs/promises";
import React, { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the email to your backend or an API endpoint
  };
  return (
    <div id="book-event">
      {submitted ? (
        <div className="success-message">
          <h2>Thank you for booking!</h2>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Book Your Spot</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={() => setSubmitted(true)}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
