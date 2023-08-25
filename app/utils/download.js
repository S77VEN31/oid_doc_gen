const urls = {
  download: 'http://127.0.0.1:5000/mib/download/',
};

// Preguntarle a ale para pasar los archivos 1 por 1
// Se les remueve la extension y se pasa un con el json, arbol y pdf de cada uno por separado

export default async function downloadMibDocs() {
  const url = `${urls.download}`;
  const response = await fetch(url);
  console.log(response);
  console.log(url);
  if (response.ok) {
    return response;
  } else {
    console.log('Response error');
    throw new Error(response.statusText);
  }
}
