import {  useState } from 'react';
import { API_URL } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Suggestions(){
  const [returnIA,setReturnIA] = useState(null);
  const [loader, setLoader] = useState(false);
 
  const sendFile = async (event: any) => {
    setReturnIA(null);
    const input = event?.target as HTMLInputElement;
    const file = input?.files && input.files[0];

    if (!file) return;

    const isCsv = file.type === 'text/csv' || /\.csv$/i.test(file.name);
    if (!isCsv) {
      alert('Selecione um arquivo .csv válido.');
      input.value = '';
      return;
    }

    setLoader(true);
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(`${API_URL}/agent/ia-analyze-csv`, {
        method: 'POST',
        body: form
      });

      if (!res.ok) throw new Error(await res.text());

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : await res.text();

      setReturnIA(data);
      input.value = '';
    } catch (err) {
      console.error(err);
      alert('Falha ao enviar o arquivo para análise.');
    } finally {
      setLoader(false);
    }
  } 
  
  const downloadReturnIA = () => {
    if (!returnIA) return;
     const escapeCsv = (value: any) => {
       if (value === null || value === undefined) return '';
       const str = String(value);
       const needsQuotes = /[",\n\r;]/.test(str);
       const escaped = str.replace(/"/g, '""');
       return needsQuotes ? `"${escaped}"` : escaped;
     };

     const toCsv = (data: any): string => {
       if (typeof data === 'string') return data;
       if (Array.isArray(data)) {
         if (data.length === 0) return '';
         if (typeof data[0] !== 'object') {
           return data.map(escapeCsv).join('\r\n');
         }
         const headerSet = new Set<string>();
         data.forEach((row) => {
           if (row && typeof row === 'object') {
             Object.keys(row).forEach((k) => headerSet.add(k));
           }
         });
         const headers = Array.from(headerSet);
         const headerLine = headers.map(escapeCsv).join(',');
         const lines = data.map((row) => headers.map((h) => escapeCsv((row || {})[h])).join(','));
         return [headerLine, ...lines].join('\r\n');
       }
       if (data && typeof data === 'object') {
         const headers = Object.keys(data);
         const headerLine = headers.map(escapeCsv).join(',');
         const valuesLine = headers.map((h) => escapeCsv((data as any)[h])).join(',');
         return [headerLine, valuesLine].join('\r\n');
       }
       return String(data);
     };

     const csv = toCsv(returnIA);
     const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = `ia-result-${new Date().toISOString().slice(0,10)}.csv`;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Sugestões (IA)</h2>

        <div className="file-upload">
          
         {!loader ?  
         <> <p className='fw-bold'>Selecione um arquivo <b className='text-danger'>.csv</b> para análise</p>
           <input type="file" id="arquivoUpload" className="input-hidden"
             onChange={(e) => sendFile(e)}/>  
            <label htmlFor="arquivoUpload" className="btn-custom-input">
                Escolher Arquivo
            </label></>: '' }
            {loader ? <div className="spinner"></div>: '' }         
        </div>
          
         {returnIA &&(
              <div className='text-area'>
               
                <button className='btn btn-success' onClick={downloadReturnIA} disabled={!returnIA}>Download</button>

                <p className='fw-bold text-success'>Retorno:</p>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {returnIA} 
                </ReactMarkdown>
            </div>)}
         
    </div>
  );
}