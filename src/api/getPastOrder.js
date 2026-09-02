export default async function getPastOrder(order) {
  const response = await fetch(`/api/past-order/${order}`);
  return response.json();
}
