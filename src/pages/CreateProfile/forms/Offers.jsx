// import React, { useContext, useEffect, useState } from "react";
// import "./forms.css";
// import { ProfileCreateContext, useProfileContext } from "../../../components/context/createProfileContext";

// const OffersForm = ({ data }) => {
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0];
//   };

//   const { state, dispatch } = useProfileContext();
//   const { offers } = state;
  
//   const [formattedDate, setFormattedDate] = useState('');

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     let month = (date.getMonth() + 1).toString();
//     let day = date.getDate().toString();

//     if (month.length === 1) {
//       month = '0' + month;
//     }
//     if (day.length === 1) {
//       day = '0' + day;
//     }

//     return `${year}-${month}-${day}`;
//   };

//   React.useEffect(() => {
//     if (offers.date) {
//       setFormattedDate(formatDate(offers.date));
//     }
//   }, [offers.date]);

//   const handleChange = (fieldName, value) => {
//     data[fieldName] = value;
//     dispatch({ type: 'UPDATE_Offers', payload: { fieldName, value } });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     data.offers.logo = file;
//     dispatch({ type: "UPDATE_Offers", payload: { fieldName: "logo", value: file } });
//   };

//   useEffect(() => {
//     console.log(offers.date);
//   }, [offers.date]);

//   return (
//     <div className="offersForm">
//       <h2 style={{ fontSize: "22px" }}>Offers</h2>
//       <div className="form-data">
//         <div className="formFields">
//           <label style={{ fontSize: "16px" }}>Status</label>
//           <select
//             onChange={(e) => handleChange("status", e.target.value)}
//             value={offers.status || ""}
//           >
//             <option value="">Select Status</option>
//             <option value="Offered">Offered</option>
//             <option value="Committed">Committed</option>
//             <option value="Interest">Interest</option>
//             <option value="Transferred">Transferred</option>
//           </select>
//         </div>
//         <div className="formFields">
//           <label style={{ fontSize: "16px" }}>Date</label>
//           <input
//             onChange={(e) => handleChange("date", e.target.value)}
//             type="date"
//             placeholder="Offer date"
//             value={formattedDate || ""}
//           />
//         </div>
//         <div className="formFields">
//           <label style={{ fontSize: "16px" }}>University</label>
//           <input
//             onChange={(e) => handleChange("university", e.target.value)}
//             type="text"
//             placeholder="University name"
//             value={offers.university || ""}
//           />
//         </div>
//         {/* <div className="formFields">
//           <label style={{ fontSize: "16px" }}>Type</label>
//           <input
//             onChange={(e) => handleChange("type", e.target.value)}
//             type="text"
//             placeholder="Offer type"
//             value={offers.type || ""}
//           />
//         </div> */}
//         <div className="formFields">
//           <label style={{ fontSize: "16px" }}>University Logo</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OffersForm;
import React, { useEffect, useState } from "react";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";

const OffersForm = ({ data }) => {
  const { state, dispatch } = useProfileContext();
  const { offers } = state;
  const [localOffers, setLocalOffers] = useState(offers);

  const handleInputChange = (index, fieldName, value) => {
    const updatedOffers = [...localOffers];
    updatedOffers[index] = {
      ...updatedOffers[index],
      [fieldName]: value,
    };
    data.offers = updatedOffers;
    setLocalOffers(updatedOffers);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    handleInputChange(index, "logo", file);
    //new
    const updatedOffers = [...localOffers];
    updatedOffers[index] = {
      ...updatedOffers[index],
      "logo":file,
      "logoid": index,
    };
    console.log("UPDATE OFFER")
    console.log(updatedOffers[index])
    data.offers = updatedOffers;
    setLocalOffers(updatedOffers);
  };

  const addOfferField = () => {
    setLocalOffers([...localOffers, { status: "", date: "", university: "", logo: null }]);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_OFFERS", payload: localOffers });
  }, [localOffers, dispatch]);

  return (
    <div className="offersForm">
      <h2 style={{ fontSize: "22px" }}>Offers</h2>
      {localOffers.map((offer, index) => (
        <div className="form-data" key={index}>
          <div className="formFields">
            <label style={{ fontSize: "16px" }}>Status</label>
            <select
              onChange={(e) => handleInputChange(index, "status", e.target.value)}
              value={offer.status || ""}
            >
              <option value="">Select Status</option>
              <option value="Offered">Offered</option>
              <option value="Committed">Committed</option>
              <option value="Interest">Interest</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>
          <div className="formFields">
            <label style={{ fontSize: "16px" }}>Date</label>
            <input
              onChange={(e) => handleInputChange(index, "date", e.target.value)}
              type="date"
              placeholder="Offer date"
              value={formatDateForInput(offer.date) || ""}
            />
          </div>
          <div className="formFields">
            <label style={{ fontSize: "16px" }}>University</label>
            <input
              onChange={(e) => handleInputChange(index, "university", e.target.value)}
              type="text"
              placeholder="University name"
              value={offer.university || ""}
            />
          </div>
    
        </div>
      ))}
      <button type="button" className="addMoreButton" onClick={addOfferField}>
        + Add New
      </button>
    </div>
  );
};

export default OffersForm;
