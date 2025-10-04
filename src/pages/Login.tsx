import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/store';
import {auth} from '../lib/auth';


export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState<string|null>(null);
  const nav = useNavigate();
  const { setSession } = useAuth();

  async function submit(e: FormEvent){
    e.preventDefault();

    try{
      const res = await auth(email, password)
     if(res){
        setSession(res.email, res.group_id);
       // localStorage.setItem('tenant','acme');
        nav('/');
      }
    }catch(ex:any){
      console.log(ex, 'erro')
       setErr(ex.message||'erro'); 
      }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <form className="bg-white border rounded-2xl shadow p-6 w-96 space-y-4" onSubmit={submit}>
        <h1 className="text-xl font-semibold">Entrar</h1>
        {err && <div className="text-red-800 text-sm">{err}</div>}
        <input className="w-full border rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha"/>
        <button type="submit" className="w-full bg-black text-white rounded px-3 py-2">Acessar</button>
      </form>
    </div>
  );
}