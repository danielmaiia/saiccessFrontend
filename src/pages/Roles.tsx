import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getPermissionGroup } from '../lib/routes';

export default function Roles(){
  const [roles,setRoles] = useState<any[]>([]);
  useEffect(()=>{ api('/roles').then(setRoles); },[]);

    useEffect(() => {
      async function getPermissionRoles() {
        try {
          const objRoles = getPermissionGroup();
          const returnData = await objRoles;
          setRoles(returnData);
        } catch (error) {
          console.error("Error", error);
        }
      }
      getPermissionRoles();
    }, []); 
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Usuários</h2>
      <table className="w-full bg-white border rounded-2xl overflow-hidden">
        <thead className="bg-gray-50">
          <tr><th className="text-left p-2">Grupo</th>
          <th className="text-left p-2">Permissão</th>
           <th className="text-left p-2">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(r=> (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.group_name}</td>
              <td className="p-2">{r.permission_name}</td>
              <td className="p-2">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}