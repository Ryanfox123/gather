"use client";

import React, { useState } from "react";
import GoBackBtn from "./GoBackBtn";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    duration: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      ...formData,
      date: new Date(formData.date),
      startTime: new Date(`${formData.date}T${formData.startTime}`),
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) throw new Error("Failed to create event");

      alert("Event created!");
    } catch (err) {
      console.error(err);
      alert("Error creating event.");
    }
  };

  return (
    <div>
      <GoBackBtn />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4 text-black">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-semibold text-lightViolet">
            Create Event
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md text-black"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border p-3 rounded-md"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="flex-1 border p-3 rounded-md"
            />
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="flex-1 border p-3 rounded-md"
            />
          </div>

          <input
            type="number"
            name="duration"
            placeholder="Duration (hours)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-lightViolet text-white py-3 rounded-lg hover:bg-darkViolet transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
