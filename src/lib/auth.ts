import {API_URL} from './api'

export async function auth(email:any, password: any) {
  const url = API_URL; 

  const data = {
    email: email,
    password: password
  };

  try {
    const response = await fetch(url+'/auth/login/user', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data) 
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const result = await response.json();
    return result

  } catch (error) {
    console.error('Erro:', error);
  }
}