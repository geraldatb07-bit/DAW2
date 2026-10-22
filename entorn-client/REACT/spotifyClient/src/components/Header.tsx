const users = ['Tumbaco', 'Gomez', 'Hidalgo', 'Minovas'];

export function RandomUser() {
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];

    return <p>Usuari: {user}</p>;
}

export function CurrentDate() {
    const date = new Date().toLocaleDateString('ca-ES');

    return <p>Data: {date}</p>;
}