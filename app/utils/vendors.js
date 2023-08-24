const urls = {
  vendor: 'http://127.0.0.1:5000/vendor',
};

export default async function fetchVendors() {
  const response = await fetch(urls.vendor);
  if (response.ok) {
    return response;
  } else {
    console.log('Response error');
    throw new Error(response.statusText);
  }
}
