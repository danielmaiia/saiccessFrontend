export const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:9000';

export async function api(path: string, opts: RequestInit = {}) {
	// const token = localStorage.getItem('token');
	// const tenant = localStorage.getItem('tenant') || 'acme';

	const headers = new Headers(opts.headers);
	if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
	// if (token) headers.set('Authorization', `Bearer ${token}`);
	// headers.set('X-Tenant', tenant);

	const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
	if (!res.ok) throw new Error(await res.text());

	const contentType = res.headers.get('content-type') || '';
	return contentType.includes('application/json') ? res.json() : res.text();
}
