'use client';

import { useDispatch } from 'react-redux';
import { logoutAdmin } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem('adminData');
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at');
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex flex-col items-center text-blue hover:text-black transition"
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
    </button>
  );
}