import { useEffect, useState } from 'react';
import { getUsers } from '../lib/routes';


export default function Users(){
  const [users,setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function listUsers() {
      try {
        const objUser = getUsers();
        const userData = await objUser;
        setUsers(userData);
      } catch (error) {
        console.error("Error", error);
      }
    }
    listUsers();
  }, []); 

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Usuários</h2>
      <table className="w-full bg-white border rounded-2xl overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
          <th className="text-left p-2">Editar</th>
          <th className="text-left p-2">Nome</th>
          <th className="text-left p-2">E-mail</th>
           <th className="text-left p-2">Grupo</th>
           <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u=> (
            <tr key={u.id} className="border-t">
              <td className="p-2"><button className='btn btn-success'>
                  Edit
                </button></td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2" style={{color: u.group_name ? 'black' : 'red'}}>
                {u.group_name ? u.group_name : 'Nenhum grupo relacionado'}</td>
              <td className="p-2" style={{color: u.status ? 'green' : 'red'}}>
                {u.status ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}