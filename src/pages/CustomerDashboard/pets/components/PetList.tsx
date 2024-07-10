import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import SearchBar from '@/components/navigation/SearchBar';
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST, CUSTOMER_PET_UPDATE } from '@/Route/router-const';
import { petsOfCustomerAPI } from '@/Services/PetService';
import { useAuth } from '@/Context/useAuth';
import { PetGet } from '@/Models/Pet';
import { useTheme } from '@/components/vet_components/theme-provider'; // Import the useTheme hook

const PetList: React.FC = () => {
  const [petProfiles, setPetProfiles] = useState<PetGet[]>([]);
  const [filteredPetProfiles, setFilteredPetProfiles] = useState<PetGet[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  const fetchImages = async (pets: PetGet[]) => {
    const newImages: { [key: string]: string } = {};
    await Promise.all(
      pets.map(async (pet) => {
        if (pet.imageUrl) {
          if (pet.imageUrl.startsWith('http')) {
            newImages[pet.id] = pet.imageUrl;
          } else {
            try {
              const file = await fetch(pet.imageUrl);
              const blob = await file.blob();
              const imageUrl = URL.createObjectURL(blob);
              newImages[pet.id] = imageUrl;
            } catch (error) {
              console.log('Error fetching image for pet: ', pet.id, error);
              newImages[pet.id] = 'https://via.placeholder.com/100';
            }
          }
        } else {
          newImages[pet.id] = 'https://via.placeholder.com/100';
        }
      })
    );
    setImages(newImages);
  };

  const getPets = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await petsOfCustomerAPI(user.userName); // Fetch pets directly from API
      if (res?.data) {
        setPetProfiles(res.data);
        setFilteredPetProfiles(res.data);
        fetchImages(res.data);
      } else {
        setPetProfiles([]);
        setFilteredPetProfiles([]);
      }
    } catch (err) {
      console.log('Error fetching pets: ', err);
      setPetProfiles([]);
      setFilteredPetProfiles([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    getPets();
  }, [getPets]);

  useEffect(() => {
    if (Array.isArray(petProfiles)) {
      const filteredProfiles = petProfiles.filter((pet) => pet.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPetProfiles(filteredProfiles);
    } else {
      setFilteredPetProfiles([]);
    }
  }, [petProfiles, searchTerm]);

  const handleViewProfile = (id: number) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}/${id}`);
  };

  return (
    <div className='py-6 px-4 rounded-lg shadow-lg h-[70vh]'>
      <div className='bg-gray-700 flex items-center justify-between rounded-md p-2 mb-3'>
        <h1 className='text-2xl font-bold text-white'>Pet List</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder='Search pets...'
          className='w-1/3'
        />
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-96'>
          {Array.isArray(filteredPetProfiles) && filteredPetProfiles.length > 0 ? (
            filteredPetProfiles.map((pet) => (
              <div
                key={pet.id}
                className='shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105'
              >
                <img
                  src={images[pet.id] || 'https://via.placeholder.com/100'}
                  alt={pet.name}
                  className='w-full object-cover object-center'
                />
                <div className='p-4 text-center'>
                  <h4 className='text-xl font-bold'>{pet.name}</h4>
                  <p className={`${theme === 'dark' ? 'text-custom-lightGray' : 'text-custom-dark'}`}>{pet.species}</p>
                  <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button
                      onClick={() => handleViewProfile(pet.id)}
                      className={`px-4 py-2 rounded transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${
                        theme === 'dark'
                          ? 'bg-custom-lightGray text-black border border-teal-500'
                          : 'bg-gray-800 text-white hover:bg-pink-900'
                      }`}
                    >
                      View
                    </button>
                    <Link
                      to={`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_UPDATE}/${pet.id}`}
                      className={`px-4 py-2 rounded transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${
                        theme === 'dark'
                          ? 'bg-custom-lightGray text-black border border-teal-500'
                          : 'bg-gray-600 text-white hover:bg-pink-900'
                      }`}
                    >
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`${theme === 'dark' ? 'text-white' : 'text-black'} font-bold`}>No pets found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PetList;
