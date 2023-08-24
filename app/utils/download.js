const urls = {
  download: 'http://127.0.0.1:5000/mib/download/',
};

const removeFileExtension = (filename) => {
  return filename.replace(/\..+$/, '');
};

// Preguntarle a ale para pasar los archivos 1 por 1
// Se les remueve la extension y se pasa un con el json, arbol y pdf de cada uno por separado

export default async function downloadMibDocs(fileName) {
  const response = await fetch(
    `${urls.download + removeFileExtension(fileName)} `,
  );
  if (response.ok) {
    return response;
  } else {
    console.log('Response error');
    throw new Error(response.statusText);
  }
}
