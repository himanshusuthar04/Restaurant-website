// import { useState } from "react";
// import axios from "axios";
// import "./ReservationForm.css";

// function ReservationForm() {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     date: "", 
//     time: "",
//     guests: 1,
//     occasion: "Casual",
//     requests: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     if (!form.name || !form.phone || !form.date || !form.time) {
//       return "Please fill all required fields";
//     }
//     if (!/^[0-9]{10}$/.test(form.phone)) {
//       return "Enter valid 10-digit phone number";
//     }
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const error = validate();
//     if (error) {
//       setMessage(error);
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post("http://localhost:5000/api/reservations", form);

//       setMessage("🎉 Table reserved successfully!");
//       setForm({
//         name: "",
//         phone: "",
//         date: "",
//         time: "",
//         guests: 1,
//         occasion: "Casual",
//         requests: "",
//       });
//     } catch {
//       setMessage("❌ Reservation failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="reservation-container">
//       <form className="reservation-form" onSubmit={handleSubmit}>
//         <h2>Reserve Your Table 🍽️</h2>
//         <p className="subtitle">Book your perfect dining experience</p>

//         {message && <p className="message">{message}</p>}

//         <div className="form-grid">
//           <input
//             name="name"
//             value={form.name}
//             placeholder="Full Name"
//             onChange={handleChange}
//           />

//           <input
//             name="phone"
//             value={form.phone}
//             placeholder="Phone Number"
//             onChange={handleChange}
//           />

//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//           />

//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             name="guests"
//             min="1"
//             value={form.guests}
//             onChange={handleChange}
//           />

//           <select
//             name="occasion"
//             value={form.occasion}
//             onChange={handleChange}
//           >
//             <option>Casual</option>
//             <option>Birthday</option>
//             <option>Anniversary</option>
//             <option>Business</option>
//           </select>
//         </div>

//         <textarea
//           name="requests"
//           placeholder="Special requests (optional)"
//           value={form.requests}
//           onChange={handleChange}
//         ></textarea>

//         <button type="submit" disabled={loading}>
//           {loading ? "Booking..." : "Reserve Now"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ReservationForm;


import { useState } from "react";
import API from "../services/api"; // ✅ Fix 5: use central API instance, removed bare axios import
import "./ReservationForm.css";

function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    occasion: "Casual",
    requests: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      return "Please fill all required fields";
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return "Enter valid 10-digit phone number";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      setLoading(true);

      // ✅ Fix 6: was axios.post("http://localhost:5000/api/reservations") — broken on live site
      await API.post("/reservations", form);

      setMessage("🎉 Table reserved successfully!");
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        occasion: "Casual",
        requests: "",
      });
    } catch (err) {
      if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
        setMessage("⏳ Server is waking up, please try again in 30 seconds.");
      } else {
        setMessage("❌ Reservation failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-container">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Reserve Your Table 🍽️</h2>
        <p className="subtitle">Book your perfect dining experience</p>

        {message && <p className="message">{message}</p>}

        <div className="form-grid">
          <input name="name" value={form.name} placeholder="Full Name" onChange={handleChange} />
          <input name="phone" value={form.phone} placeholder="Phone Number" onChange={handleChange} />
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <input type="time" name="time" value={form.time} onChange={handleChange} />
          <input type="number" name="guests" min="1" value={form.guests} onChange={handleChange} />
          <select name="occasion" value={form.occasion} onChange={handleChange}>
            <option>Casual</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Business</option>
          </select>
        </div>

        <textarea
          name="requests"
          placeholder="Special requests (optional)"
          value={form.requests}
          onChange={handleChange}
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Reserve Now"}
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;