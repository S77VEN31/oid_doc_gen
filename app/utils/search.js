const urls = {
  search: 'http://127.0.0.1:5000/search/',
};

export default async function search(term, vendor, local) {
  if (vendor === '') {
    vendor = 0;
  }
  if (local) {
    local = 1;
  } else {
    local = 0;
  }
  const url = `${urls.search + term + '?vendor=' + vendor + '&local=' + local}`;
  const response = await fetch(url);
  console.log(url);
  console.log(response);
  if (response.ok) {
    return response;
  } else {
    console.log('Response error');
    throw new Error(response.statusText);
  }
}
