export async function fetchBugs() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener bugs');
    return res.json();
}

export async function createBug(bugData) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const msg = errorBody.message || 'Error al crear bug';
        throw new Error(msg);
    }

    return res.json();
}