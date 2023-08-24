const urls = {
  upload: 'http://127.0.0.1:5000/mib/upload',
};

export default async function uploadMib(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(urls.upload, {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    return response;
  } else {
    console.log('Response error');
    throw new Error(response.statusText);
  }
}
