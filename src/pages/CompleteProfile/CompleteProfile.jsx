// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function CompleteProfile() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     role: "kid",
//     age: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("userToken"); // JWT
//       const res = await axios.put(
//         "http://localhost:8000/api/accounts/complete-profile/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(res.data);
//       alert("Profile completed successfully!");
//       navigate("/"); // ارجع للصفحة الرئيسية
//     } catch (err) {
//       setError(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Complete Your Profile</h2>
//       <form onSubmit={handleSubmit} className="mt-3">
//         <div className="mb-3">
//           <label>First Name</label>
//           <input
//             type="text"
//             name="first_name"
//             className="form-control"
//             value={formData.first_name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="last_name"
//             className="form-control"
//             value={formData.last_name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Role</label>
//           <select
//             name="role"
//             className="form-control"
//             value={formData.role}
//             onChange={handleChange}
//           >
//             <option value="kid">Kid</option>
//             <option value="parent">Parent</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label>Age</label>
//           <input
//             type="number"
//             name="age"
//             className="form-control"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             className="form-control"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>

//         {error && <p className="text-danger">{JSON.stringify(error)}</p>}

//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Saving..." : "Complete Profile"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CompleteProfile;
