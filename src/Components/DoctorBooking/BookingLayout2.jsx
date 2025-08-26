import React, { useState, useEffect } from 'react'
import DoctorCard from './DoctorCard/DoctorCard';
import { useSearchParams, useNavigate } from 'react-router-dom'
import "./Booking.css"
import imgUrl from "../../assets/pana2.png"

function BookingLayout() {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/e5f9e0258080e65ea5f3')
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
  useEffect(() => {
      getDoctorsDetails();
  }, [searchParams])

// FIND DOCTORS
  const initSpeciality = [
    'Diagnostic radiology', 'Neurology', 'Physical therapy', 'Dermatology', 'General surgery'
  ]
  const [resultHidden, setResultHidden] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleSelect = (speciality) => {
      setSearch(speciality);
      setResultHidden(true);
      navigate(`/doctor-booking/2?speciality=${speciality}`);
  }

  return (
    <section>
      <h2>Find a consult instantly</h2>
        <section className='find-doctor'>
        <div>
          <img src={imgUrl} hidden={!resultHidden || search}/>
        </div>
        <div className='search-container'>
            <div className="search-bar">
              <input type="text" className="search-input" placeholder="Search doctors, clinics, hospitals, etc." 
                value={search} onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setResultHidden(false)}
                onBlur={() => setResultHidden(true)}
              />
              <div hidden={!resultHidden}>
              <i className="fa fa-search search-icon" aria-hidden="true" ></i>
              </div>
            </div>
            <div className="search-result" hidden={resultHidden}>
            {
              initSpeciality.map(speciality => 
              <div className="search-result-item" 
                key={speciality} onMouseDown={() => handleSelect(speciality)}>
                <i className="fa fa-search search-icon" aria-hidden="true"></i>
                <span>{speciality}</span>
              </div>)
            }
            </div>
        </div>
      </section>

      <div>
        {isSearched ? (
          <div>
            <h3 style={{fontSize: "28px", color: "red", marginTop: "20px", marginBottom: "10px"}}>
              {filteredDoctors.length} doctors are available {searchParams.get('location')}
            </h3>
            <p>Book appointments with minimum wait-time & verified doctor details</p>
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