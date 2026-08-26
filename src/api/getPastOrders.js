export default async function getPastOrders(page) {
  console.log(`fetching page ${page}`);
  const response = await fetch(`/api/past-orders?page=${page}`);
  return response.json();
}
