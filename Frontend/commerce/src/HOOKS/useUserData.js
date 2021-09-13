import { useEffect, useState } from 'react';

function getProfileData() {
  return JSON.parse(localStorage.getItem('user'));
}

export default function useProfileData() {
  const [profile, setProfile] = useState(getProfileData());

  useEffect(() => {
    function handleChangeStorage() {
      setProfile(getProfileData());
    }

    window.addEventListener('storage', handleChangeStorage.bind(this));
    return () =>
      window.removeEventListener('storage', handleChangeStorage.bind(this));
  }, []);

  return profile;
}
