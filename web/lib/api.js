export async function fetchStatus() {
  const response = await fetch('/');
  return response.json();
}
