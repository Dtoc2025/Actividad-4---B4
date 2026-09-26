const API_URL = 'https://jsonplaceholder.typicode.com/users';

const userList = document.getElementById('userList');
const searchInput = document.getElementById('searchInput');

let allUsers = [];
let cargando = false;

async function obtenerUsuarios() {
    if (cargando) return;
    cargando = true;

    mostrarMensaje('Cargando usuarios...');

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        allUsers = await respuesta.json();
        renderizarUsuarios(allUsers);

    } catch (error) {
        console.error('Error al obtener datos:', error);
        mostrarMensaje('No se pudieron cargar los usuarios. Intenta de nuevo.');
    } finally {
        cargando = false;
    }
}

function renderizarUsuarios(usuarios) {
    userList.innerHTML = '';

    if (usuarios.length === 0) {
        mostrarMensaje('No se encontraron resultados.');
        return;
    }

    const fragmento = document.createDocumentFragment();

    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${usuario.name}</strong>
            <span>${usuario.email}</span>
        `;
        fragmento.appendChild(li);
    });

    userList.appendChild(fragmento);
}

function mostrarMensaje(texto) {
    userList.innerHTML = `<li class="mensaje">${texto}</li>`;
}

function filtrarUsuarios() {
    const termino = searchInput.value.trim().toLowerCase();
    const filtrados = allUsers.filter(usuario =>
        usuario.name.toLowerCase().includes(termino) ||
        usuario.email.toLowerCase().includes(termino)
    );
    renderizarUsuarios(filtrados);
}

searchInput.addEventListener('input', filtrarUsuarios);

obtenerUsuarios();