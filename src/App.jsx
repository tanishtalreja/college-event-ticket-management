import { useState, useEffect, createContext, useContext } from "react";

// ================= CONTEXT (EXPERIMENT 3) =================
const UserContext = createContext();

// ================= CUSTOM HOOK =================
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// ================= DASHBOARD COMPONENT =================
function Dashboard() {
  const { user, cart, removeFromCart } = useContext(UserContext);

  // Custom hook usage (updates document title to demonstrate useEffect)
  useDocumentTitle(`Dashboard - ${user.name}`);

  const totalTickets = cart.reduce((sum, item) => sum + item.tickets, 0);

  return (
    <div className="mx-auto my-8 max-w-7xl px-5 lg:px-8">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-violet-200 bg-violet-50/70 p-6 backdrop-blur md:flex-row md:items-center">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-violet-600">
            Experiment 3 Output (State Management)
          </span>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Welcome, {user.name}!
          </h2>
          <p className="text-sm font-medium text-slate-600">
            Role: <span className="font-bold">{user.role}</span> | Active Cart:{" "}
            <span className="font-bold text-violet-600">{totalTickets} tickets</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
            ✓ Context API State Active
          </div>
        </div>
      </div>

      {/* Cart Items List displaying live Context State */}
      {cart.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700">Your Booked Event Tickets (Global State):</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold">
                <span>{item.title} ({item.tickets}x)</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] text-white hover:bg-rose-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================= SAMPLE DATASET =================
const events = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "25 AUG",
    fullDate: "25 August 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    description:
      "A full day of coding, robotics, innovation and everything tech.",
    color: "from-violet-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Cultural Night",
    category: "Cultural",
    date: "30 AUG",
    fullDate: "30 August 2026",
    time: "6:00 PM",
    venue: "College Ground",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    description:
      "Music, dance, drama and unforgettable performances under the lights.",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 3,
    title: "Inter College Cricket",
    category: "Sports",
    date: "05 SEP",
    fullDate: "5 September 2026",
    time: "9:00 AM",
    venue: "College Sports Ground",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80",
    description:
      "Bring your squad and cheer for your college at the biggest cricket clash.",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: 4,
    title: "Photography Workshop",
    category: "Workshop",
    date: "10 SEP",
    fullDate: "10 September 2026",
    time: "11:00 AM",
    venue: "Seminar Hall",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn photography, composition and creative storytelling from experts.",
    color: "from-orange-400 to-amber-600",
  },
  {
    id: 5,
    title: "Startup Summit",
    category: "Business",
    date: "15 SEP",
    fullDate: "15 September 2026",
    time: "10:30 AM",
    venue: "Conference Hall",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    description:
      "Meet founders, creators and entrepreneurs building the next big thing.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 6,
    title: "Music Festival",
    category: "Cultural",
    date: "20 SEP",
    fullDate: "20 September 2026",
    time: "5:00 PM",
    venue: "College Ground",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
    description:
      "Live music, student bands and an evening made for good vibes.",
    color: "from-fuchsia-500 to-purple-600",
  },
];

// ================= MAIN APP =================
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [bookingMessage, setBookingMessage] = useState("");

  // Context State (Cart Management)
  const [cart, setCart] = useState([]);

  // Action 1: Add/Update Ticket in Cart
  const addToCart = (event, qty) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === event.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === event.id ? { ...item, tickets: item.tickets + qty } : item
        );
      }
      return [...prevCart, { ...event, tickets: qty }];
    });
  };

  // Action 2: Remove Ticket from Cart
  const removeFromCart = (eventId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== eventId));
  };

  const user = {
    name: "Student",
    role: "User",
  };

  useEffect(() => {
    console.log("Dashboard component loaded into App.");
  }, []);

  const categories = [
    "All",
    "Technology",
    "Cultural",
    "Sports",
    "Workshop",
    "Business",
  ];

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openBooking = (event) => {
    setSelectedEvent(event);
    setTickets(1);
    setBookingMessage("");
  };

  const closeBooking = () => {
    setSelectedEvent(null);
    setBookingMessage("");
  };

  const increaseTickets = () => {
    if (tickets < 6) setTickets(tickets + 1);
  };

  const decreaseTickets = () => {
    if (tickets > 1) setTickets(tickets - 1);
  };

  const bookTickets = () => {
    addToCart(selectedEvent, tickets);
    setBookingMessage(
      `You're in! ${tickets} ticket${
        tickets > 1 ? "s" : ""
      } booked for ${selectedEvent.title}.`
    );
  };

  const scrollToEvents = () => {
    document
      .getElementById("events")
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const totalCartTickets = cart.reduce((sum, item) => sum + item.tickets, 0);

  return (
    <UserContext.Provider value={{ user, cart, addToCart, removeFromCart }}>
      <div className="min-h-screen bg-[#faf9ff] text-slate-900">
        {/* ================= NAVBAR ================= */}
        <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a href="#home" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-105">
                ✦
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  after<span className="text-violet-600">class</span>
                </h1>
                <p className="hidden text-[10px] font-medium tracking-widest text-slate-400 sm:block">
                  YOUR CAMPUS. YOUR VIBE.
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#home"
                className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
              >
                Home
              </a>
              <a
                href="#events"
                className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
              >
                Discover
              </a>
              <a
                href="#about"
                className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
              >
                About
              </a>

              {totalCartTickets > 0 && (
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                  🛒 {totalCartTickets} Tickets
                </span>
              )}

              <button
                onClick={scrollToEvents}
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-600"
              >
                Explore ✦
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xl md:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* ================= EXPERIMENT 3 DASHBOARD BANNER ================= */}
        <Dashboard />

        {/* ================= HERO ================= */}
        <section id="home" className="relative overflow-hidden bg-[#faf9ff]">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-600" />
                What's happening on campus?
              </div>

              <h2 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Life doesn't stop
                <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                  after class.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                Find events, meet your people, catch the moments and make memories.
                Everything happening around campus — all in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={scrollToEvents}
                  className="rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:bg-violet-600"
                >
                  Find your vibe →
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-r from-violet-300/30 to-pink-300/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-3 shadow-2xl">
                <div className="relative h-[480px] overflow-hidden rounded-[1.5rem]">
                  <img
                    src={events[1].image}
                    alt={events[1].title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-black text-slate-900 backdrop-blur">
                      TRENDING ✦
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm font-semibold text-white/70">
                      {events[1].date} • {events[1].time}
                    </p>
                    <h3 className="mt-2 text-4xl font-black">
                      {events[1].title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Music • Dance • Drama • Good vibes
                    </p>
                    <button
                      onClick={() => openBooking(events[1])}
                      className="mt-5 w-full rounded-xl bg-white py-3 font-bold text-slate-950 transition hover:bg-violet-100"
                    >
                      Get Tickets — ₹{events[1].price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= EVENTS SECTION ================= */}
        <section id="events" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black tracking-widest text-violet-600">
                DISCOVER
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Find your next vibe.
              </h2>
            </div>
            <div className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-600">
              {filteredEvents.length} events found ✦
            </div>
          </div>

          <div className="mb-7 flex max-w-2xl items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
            <span className="mr-3 text-lg">⌕</span>
            <input
              type="text"
              placeholder="Search events, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  selectedCategory === category
                    ? "bg-slate-950 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <button
                    onClick={() => toggleFavorite(event.id)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg backdrop-blur transition hover:scale-110"
                  >
                    {favorites.includes(event.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black tracking-tight">{event.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">{event.description}</p>
                  <button
                    onClick={() => openBooking(event)}
                    className="mt-6 w-full rounded-xl bg-slate-950 py-3.5 text-sm font-black text-white transition hover:bg-violet-600"
                  >
                    Get Tickets →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BOOKING MODAL ================= */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={closeBooking}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-black">{selectedEvent.title}</h2>
              <p className="mt-1 text-sm text-slate-500">₹{selectedEvent.price} per ticket</p>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-100 p-3">
                <span className="text-sm font-bold">Select Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseTickets}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-black shadow-sm"
                  >
                    -
                  </button>
                  <span className="font-black">{tickets}</span>
                  <button
                    onClick={increaseTickets}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-black shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-black">
                  ₹{selectedEvent.price * tickets}
                </span>
                <button
                  onClick={bookTickets}
                  className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white hover:bg-violet-600"
                >
                  {bookingMessage ? "Booked" : "Confirm →"}
                </button>
              </div>

              {bookingMessage && (
                <p className="mt-4 text-sm font-bold text-green-600">
                  {bookingMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;