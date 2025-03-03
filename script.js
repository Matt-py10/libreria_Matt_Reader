const books = [
    { title: "Cien años de soledad", category: "novela", image: "imagenes/100years.jpeg", synopsis: "Esta obra maestra narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.", free: false },
    { title: "El principito", category: "infantil", image: "imagenes/prince.jpg", synopsis: "Este clásico de la literatura cuenta la historia de un piloto que, tras un accidente en el desierto, conoce a un pequeño príncipe proveniente de otro planeta.", free: true },
    { title: "1984", category: "ficcion", image: "imagenes/1984.jpeg", synopsis: "Ambientada en una sociedad distópica, la novela sigue la vida de Winston Smith, un hombre que trabaja para el Partido controlando la información.", free: true },
    { title: "Don Quijote de la Mancha", category: "clasico", image: "imagenes/DonQ.jpeg", synopsis: "La historia del caballero Don Quijote y su fiel escudero Sancho Panza en su lucha contra molinos de viento y aventuras desquiciadas.", free: true },
    { title: "Harry Potter y la piedra filosofal", category: "fantasia", image: "imagenes/hp.jpeg", synopsis: "Harry Potter descubre que es un mago y comienza su aventura en Hogwarts, donde se enfrenta a la amenaza de Lord Voldemort.", free: false },
    { title: "El hobbit", category: "aventura", image: "imagenes/hobbit.jpeg", synopsis: "Bilbo Bolsón emprende un viaje inesperado con un grupo de enanos para recuperar su tesoro de las garras del dragón Smaug.", free: false },
    { title: "Los juegos del hambre", category: "ciencia-ficcion", image: "imagenes/jh.jpeg", synopsis: "En un futuro distópico, Katniss Everdeen se convierte en símbolo de la rebelión tras participar en los brutales Juegos del Hambre.", free: false },
    { title: "Orgullo y prejuicio", category: "romance", image: "imagenes/pride.jpeg", synopsis: "La historia de Elizabeth Bennet y el orgulloso señor Darcy en una sociedad que valora el matrimonio y la posición social.", free: false },
    { title: "Crónica de una muerte anunciada", category: "novela", image: "imagenes/UMA.jpg", synopsis: "La historia reconstruye el asesinato de Santiago Nasar en un pueblo donde todos sabían lo que iba a ocurrir, menos él.", free:false },
    { title: "Drácula", category: "terror", image: "imagenes/drac.jpeg", synopsis: "El conde Drácula viaja desde Transilvania a Inglaterra para expandir su reino de terror y enfrentarse al profesor Van Helsing.", free: false },
    { title: "El Camino Del Lobo", category: "hechos-reales", image: "imagenes/lobo.jpg", synopsis:"El lobo de Wall Street es la autobiografía de Jordan Belfort, un corredor de bolsa que hizo fortuna con fraudes financieros. Su vida de lujos y excesos terminó cuando el FBI lo atrapó, marcando su caída en Wall Street.", free: true },
    { title: "Hábitos Atómicos", category: "desarrollo-personal", image: "imagenes/habitos.jpg", synopsis: "James Clear explica cómo pequeños cambios diarios pueden generar grandes resultados, enseñando estrategias para formar buenos hábitos y eliminar los malos.", free: true },
    { title: "12 Reglas para Vivir", category: "desarrollo-personal", image: "imagenes/12reglas.webp", synopsis: "Jordan Peterson presenta 12 principios fundamentales para vivir con propósito y responsabilidad, abordando temas como la autodisciplina, el significado y el orden en la vida.", free: true },
    { title: "El Cuervo", category: "poesia", image: "imagenes/cuervo.jpg", synopsis: "Un hombre es visitado por un cuervo que repite 'Nunca más', sumiéndolo en la desesperación y la locura.",free: false}     

];

document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav-bar").classList.toggle("active");
});

document.querySelectorAll(".nav-bar a").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelector(".nav-bar").classList.remove("active");
    });
});

document.addEventListener("click", function(event) {
    const navBar = document.querySelector(".nav-bar");
    const menuToggle = document.getElementById("menu-toggle");
    if (!navBar.contains(event.target) && !menuToggle.contains(event.target)) {
        navBar.classList.remove("active");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const bookList = document.getElementById("book-list");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const modal = document.createElement("div");
    const musicToggle = document.getElementById('music-toggle');
    const musicPlayer = document.getElementById('music-player');
    let isPlaying = false;

    // Aplicar el tema guardado en localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "🌞";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            themeToggle.textContent = "🌞";
        } else {
            localStorage.setItem("darkMode", "disabled");
            themeToggle.textContent = "🌝";
        }
    });


    // Reproductor de música
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            musicPlayer.pause();
        } else {
            musicPlayer.play();
        }
        isPlaying = !isPlaying;
    });

    // Filtrar por categoría
    document.querySelectorAll('.nav-bar a').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.getAttribute('category').toLowerCase();

            document.querySelectorAll('.book-card').forEach(book => {
                const bookCategory = book.getAttribute('data-genre').toLowerCase();
                if (category === "all" || bookCategory === category) {
                    book.style.display = 'block';
                } else {
                    book.style.display = 'none';
                }
            });
        });
    });

    // Búsqueda de libros
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.book-card').forEach(book => {
            const title = book.querySelector('.book-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });

    // Renderizar los libros
    function renderBooks() {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const div = document.createElement("div");
            div.classList.add("book-card");
            div.setAttribute("data-genre", book.category.toLowerCase());
            div.style.animation = `fadeIn 0.3s ease-in-out ${index * 0.1}s both`;
            div.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-image"/>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-category">${book.category}</p>
            `;
            div.addEventListener("click", (event) => {
                event.stopPropagation();
                openModal(book);
            });
            bookList.appendChild(div);
        });
    }

    // Modal de detalles del libro
    function openModal(book) {
        // Usa un atributo 'pdf' en el objeto books para evitar errores en el nombre del archivo
        const fileName = book.pdf ? book.pdf : book.title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
            .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
            .toLowerCase() + ".pdf";
    
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${book.image}" alt="${book.title}" class="modal-image"/>
                <div class="modal-text">
                    <h2>${book.title}</h2>
                    <p>${book.synopsis}</p>
                    <button class="modal-button">${book.free ? "Leer" : "Comprar"}</button>
                </div>
            </div>
        `;
    
        modal.classList.add("floating-modal");
        document.body.appendChild(modal);
        modal.style.display = "flex";
    
        // Depuración: Verificar el nombre del archivo
        console.log("Intentando abrir:", `libros/${fileName}`);
    
        document.querySelector(".modal-button").addEventListener("click", (e) => {
            e.stopPropagation();
            if (book.free) {
                window.open(`libros/${fileName}`, '_blank');
            } else {
                alert("Por favor, inicia sesión para comprar el libro.");
            }
        });
    
        modal.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    
        document.addEventListener("click", () => {
            modal.style.display = "none";
        }, { once: true });
    }
    
    // Cerrar modal al hacer clic fuera
    document.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Renderizar los libros al cargar la página
    renderBooks();

    const style = document.createElement("style");
    style.textContent = `
        .floating-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%; /* Se adapta mejor a móviles */
            max-width: 700px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
            display: none;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            z-index: 1000;
        }

        /* 💎 Contenido del modal */
        .modal-content {
            display: flex;
            align-items: center;
            gap: 20px;
            background: linear-gradient(to left, rgb(151, 40, 40), rgba(59, 1, 1, 0.67));
            padding: 20px;
            border-radius: 10px;
            flex-wrap: wrap;
        }

        /* 📸 Imagen del modal */
        .modal-image {
            width: 100%; /* Se ajusta mejor en móviles */
            max-width: 250px;
            height: auto;
            border-radius: 8px;
        }

        /* 📜 Texto del modal */
        .modal-text {
            flex: 1;
            text-align: left;
            font-size: 1.2rem; /* Tamaño más adaptable */
        }

        /* 🔘 Botón del modal */
        .modal-button {
            background: rgb(255, 72, 0);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
        }

        .modal-button:hover {
            background: rgb(108, 3, 3);
        }

        /* 🌑 Modo oscuro */
        .dark-mode .modal-content {
            background: linear-gradient(to left, rgb(0, 115, 169), rgba(2, 33, 63, 0.67));
        }

        .dark-mode .modal-button:hover {
            background: rgb(2, 108, 97);
        }

        /* 📱 Responsividad para móviles */
        @media (max-width: 600px) {
            .floating-modal {
                width: 95%;
                flex-direction: column; /* Cambia la disposición a vertical */
                text-align: center;
            }
            .modal-content {
                flex-direction: column;
                align-items: center;
            }
            .modal-image {
                max-width: 200px;
            }
            .modal-text {
                font-size: 1rem;
                text-align: center;
            }
            .modal-button {
                width: 100%; /* Botón ocupa todo el ancho */
                padding: 14px;
            }
        }

        

    `;
    document.head.appendChild(style);
});
