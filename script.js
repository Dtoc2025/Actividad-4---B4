const userList = document.getElementById('userList');
const searchInput = document.getElementById('searchInput');
let allUsers = [];

// Obtener datos desde la API pública
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        allUsers = await response.json();
        displayUsers(allUsers);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// Mostrar los datos dinámicamente
function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

// Interacción básica (Filtro de búsqueda)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
});

// Inicializar
fetchUsers();

