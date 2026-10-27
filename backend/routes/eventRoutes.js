const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = require("../models/Event");

const sampleEvents = [
  {
    _id: "sample-1",
    title: "Tech Fest 2026",
    category: "Technology",
    date: "25 AUG",
    location: "Main Auditorium",
    price: 100,
    availableTickets: 50,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    description: "A full day of coding, robotics, innovation and everything tech."
  },
  {
    _id: "sample-2",
    title: "Cultural Night",
    category: "Cultural",
    date: "30 AUG",
    location: "College Ground",
    price: 150,
    availableTickets: 120,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    description: "Music, dance, drama and unforgettable performances under the lights."
  },
  {
    _id: "sample-3",
    title: "Inter College Cricket",
    category: "Sports",
    date: "05 SEP",
    location: "College Sports Ground",
    price: 80,
    availableTickets: 200,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80",
    description: "Bring your squad and cheer for your college at the biggest cricket clash."
  },
  {
    _id: "sample-4",
    title: "Photography Workshop",
    category: "Workshop",
    date: "10 SEP",
    location: "Seminar Hall",
    price: 200,
    availableTickets: 30,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    description: "Learn photography, composition and creative storytelling from experts."
  },
  {
    _id: "sample-5",
    title: "Startup Summit",
    category: "Business",
    date: "15 SEP",
    location: "Conference Hall",
    price: 250,
    availableTickets: 80,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    description: "Meet founders, creators and entrepreneurs building the next big thing."
  },
  {
    _id: "sample-6",
    title: "Music Festival",
    category: "Cultural",
    date: "20 SEP",
    location: "College Ground",
    price: 120,
    availableTickets: 150,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
    description: "Live music, student bands and an evening made for good vibes."
  }
];

// 1. CREATE EVENT (POST)
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. GET ALL EVENTS (GET)
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const events = await Event.find();
      if (events && events.length > 0) {
        return res.status(200).json(events);
      }
      try {
        const toSeed = sampleEvents.map(({ _id, ...e }) => e);
        const seeded = await Event.insertMany(toSeed);
        return res.status(200).json(seeded);
      } catch {
        return res.status(200).json(sampleEvents);
      }
    }
    // Return sample events if DB is disconnected or waking up
    res.status(200).json(sampleEvents);
  } catch (error) {
    res.status(200).json(sampleEvents);
  }
});

// 3. GET EVENT BY ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. UPDATE EVENT (PUT)
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. DELETE EVENT (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;