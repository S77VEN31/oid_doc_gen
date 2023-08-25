const urls = {
  search: 'http://127.0.0.1:5000/search/',
};

export default async function search(term) {
  const response = await fetch(`${urls.search + term}`);
  if (response.ok) {
    return response;
  } else {
    console.log('Response error');
    throw new Error(response.statusText);
  }
}
