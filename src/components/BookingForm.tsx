import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  date: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ date: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight to compare dates only

    if (selectedDate < today) {
      setError("The selected date must be today or in the future.");
      return;
    }

    // Clear any existing error message
    setError("");

    // Handle form submission logic here
    console.log("Form submitted:", formData);

    // Navigate to the next form or page
    navigate("/next-form");
  };

  return (
    <div>
      <h1>Booking Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default BookingForm;
