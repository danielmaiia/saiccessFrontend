import { useAuth } from '../lib/store';
import { useNavigate } from 'react-router-dom';

export default function Topbar(){
   const { clear } = useAuth();
   const nav = useNavigate();

   function logout(){
      clear();
       nav('/login');
   }
  return (
    <header className="h-14 border-b bg-white flex items-center px-4 justify-between sticky top-0 z-10">
      <div className="font-semibold">SAIccess</div>
      <button className="text-sm text-gray-500 rounded-lg hover:bg-gray-100" itemType="button" onClick={logout}>Sair</button>
    </header>
  );
}