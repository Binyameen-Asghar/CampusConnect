export async function startAutomation(system: 'slate' | 'erp') {
  try {
    const response = await fetch(`http://localhost:3000/api/login/${system}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to start automation');
    }

    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to connect to server');
  }
}