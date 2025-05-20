export async function getRealProblems(domain = 'sarnex.com') {
  const res = await fetch(`http://localhost:8000/api/client/${domain}/real-problems`)
  if (!res.ok) throw new Error('Failed to fetch real problems data')
  return res.json()
}
