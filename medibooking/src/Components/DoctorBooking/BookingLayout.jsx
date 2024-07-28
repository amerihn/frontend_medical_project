import React from 'react'
import FindDoctor from './FindDoctor'
import DoctorCard from './DoctorCard/DoctorCard';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import "./Booking.css"

function BookingLayout() {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
    .then(res => res.json())
    .then(data => {
      if (searchParams.get('speciality')) {
        // window.reload()
        const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
        setFilteredDoctors(filtered);     
        setIsSearched(true);
        // window.reload()
      } else {
        setFilteredDoctors([]);
        setIsSearched(false);
      }
      setDoctors(data);
    })
    .catch(err => console.log(err));
  }
  // const handleSearch = (searchText) => {
  //   if (searchText === '') {
  //     setFilteredDoctors([]);
  //     setIsSearched(false);
  //     } else {          
  //     const filtered = doctors.filter(
  //         (doctor) => doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setFilteredDoctors(filtered);
  //     setIsSearched(true);
  //     // window.location.reload()
  //   }
  // };

  // const navigate = useNavigate();
  
  useEffect(() => {
      getDoctorsDetails();
      // const authtoken = sessionStorage.getItem("auth-token");
      // if (!authtoken) {
      //     navigate("/login");
      // }
  }, [searchParams])

  return (
    <section>
      <h2>Find doctor at your own ease</h2>
      <FindDoctor/>
      <div>
        {isSearched ? (
          <div>
            <h2 style={{fontSize: "28px", color: "red", marginTop: "20px"}}>
              {filteredDoctors.length} doctors are available {searchParams.get('location')}
            </h2>
            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
          </div>
        ) : (
        ''
        )}
      </div>
      <div className="result-layout" >
        {filteredDoctors.map(doctor => 
          <DoctorCard {...doctor} key={doctor.name} />
        )}
      </div>

    </section>
  )
}

export default BookingLayout