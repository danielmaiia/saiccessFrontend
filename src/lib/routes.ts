import {API_URL} from './api'

const url = API_URL; 

export async function getUsers(){
  try {
    const response = await fetch(url+'/api/all-user', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json' 
      }, 
  }) 
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const result = await response.json();
    return result

  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getPermissionGroup(){
    try {
        const response = await fetch(url+'/api/permission-for-group', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json' 
          }, 
      }) 
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const result = await response.json();
        return result
    
      } catch (error) {
        console.error('Erro:', error);
  }
}

export async function getAgentAi(request: any){
    try {
        const response = await fetch(url+'/agent/ia-server', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          }, 
          body: JSON.stringify(request)
      }) 
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const result = await response.json();
        return result
    
      } catch (error) {
        console.error('Erro:', error);
  }
}