# MarcosFlix-es

Bienvenido a la **MarcosFlix**, una aplicación de gestión de películas donde puedes explorar, añadir, eliminar y calificar tus películas favoritas. La aplicación se conecta a MongoDB Atlas para almacenar tu lista de películas, favoritos y reseñas, además de integrar datos de películas desde TMDB (The Movie Database).

## 🚀 Descripción

Esta aplicación está dividida en dos partes:
- **Backend (Node.js + Express)**: Gestiona la API, las operaciones de base de datos (MongoDB Atlas), autenticación y autorización de usuarios.
- **Frontend (Next.js)**: Interfaz de usuario que permite explorar, buscar, añadir y gestionar películas, así como interactuar con los detalles de cada una.

**Características principales**:
- **Lista de Películas**: Ver, filtrar y ordenar películas por título, fecha, puntuación, plataforma y género.
- **Favoritos**: Añadir y quitar películas de la lista de favoritos.
- **Crear Películas**: Añadir nuevas películas con información y poster.
- **Reviews**: Crear y gestionar reseñas de películas.
- **Conexión con TMDB**: Ver y añadir películas desde la API externa de TMDB.

### 📸 Imagen de la App
Aquí puedes añadir una captura de pantalla o un mockup de tu aplicación para dar a los usuarios una vista previa de la interfaz.

![Imagen De La APP](https://github.com/user-attachments/assets/ed4a7c7c-0028-4b8a-86d7-a5178ad6d25c)


---

## 🛠️ Tecnologías Usadas

- **Backend**: Node.js, Express, MongoDB, JWT para autenticación.
- **Frontend**: Next.js, React.
- **Base de datos**: MongoDB Atlas.
- **API Externa**: TMDB (The Movie Database).

---

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para ejecutar la aplicación localmente.

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/movie-database-app.git
cd movie-database-app
```

## 2. Instalación de dependencias

### Backend

1. Ve a la carpeta del **backend**:
   
   `cd backend`
   
2. Instala las dependencias:
    
   `pnpm install`
   

### Frontend

1. Ve a la carpeta del frontend:
    
   `cd frontend`
    
2. Instala las dependencias:
    
   `pnpm install`
    

### 3. Configuración de MongoDB Atlas

Asegúrate de tener una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una base de datos. Luego, en el backend, configura tu URI de MongoDB en el archivo `.env`:

MONGO_URI=tu_uri_de_mongo

### 4. Ejecutar la aplicación

#### Backend

1. En la carpeta **backend**, ejecuta el siguiente comando para iniciar el servidor:

   `pnpm start`

#### Frontend

1. En la carpeta **frontend**, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

   `pnpm run dev`

La aplicación estará disponible en `http://localhost:4000`.

Puedes ver la documaentación de la API en `http://localhost:3000/swagger/`.

---

## Funcionalidades

### 1. Autenticación de Usuario

Los usuarios deben registrarse o iniciar sesión para acceder a ciertas funcionalidades, como agregar películas a la lista, crear reseñas y gestionar favoritos. El sistema de autenticación utiliza JWT (JSON Web Tokens).

- **Registro**: Crea una nueva cuenta con un nombre de usuario y contraseña.
- **Inicio de sesión**: Autenticación de usuario con JWT.
- **Protección de Rutas**: Las rutas protegidas solo son accesibles si el usuario está autenticado y tiene un token válido.

### 2. Gestión de Películas

- **Lista de Películas**: Ver todas las películas disponibles en tu base de datos y filtrar por:
  - Título
  - Fecha
  - Puntuación
  - Plataforma
  - Género

- **Ordenar Películas**: Puedes ordenar las películas por **puntuación** o por la **más reciente**.

- **Favoritos**: Añadir o eliminar películas de tu lista de favoritos.

- **Crear Películas**: Los usuarios autenticados pueden añadir nuevas películas con información detallada y un poster.

### 3. Detalles de la Película y Reseñas

Cuando haces clic en una película de la lista, puedes ver los detalles de la película, y si eres un usuario autenticado, tendrás dos opciones:
- **Hacer una Reseña**: Añadir tu opinión sobre la película.
- **Borrar de la lista**: Eliminar la película de tu lista personal.

### 4. TMDB Integration

- En la sección **Más Películas**, se muestra una lista de películas obtenidas desde la API de TMDB.
- Puedes añadir estas películas a tu lista personal.

---

## Consideraciones Adicionales

- **CORS**: Si encuentras problemas de CORS en el backend, asegúrate de que la configuración esté adecuada para permitir solicitudes desde el frontend.
- **Variables de Entorno**: Asegúrate de configurar correctamente las variables de entorno en ambos backend y frontend para asegurar la correcta comunicación con la base de datos y la API de TMDB.

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

Gracias por usar **MarcosFlix**. ¡Espero que disfrutes gestionando tus películas favoritas! 🎬

# MarcosFlix-en

Welcome to the MarcosFlix, a movie management application where you can explore, add, remove, and rate your favorite movies. The application connects to MongoDB Atlas to store your movie list, favorites, and reviews, and integrates data from TMDB (The Movie Database) API.

## Description

This application is divided into two parts:
- **Backend (Node.js + Express)**: Handles the API, database operations (MongoDB Atlas), user authentication, and authorization.
- **Frontend (Next.js)**: User interface that allows you to explore, search, add, and manage movies, as well as interact with the details of each movie.

Main features include:
- **Movie List**: View, filter, and sort movies by title, date, rating, platform, and genre.
- **Favorites**: Add and remove movies from your favorite list.
- **Create Movies**: Add your own movies with details and a poster.
- **Reviews**: Create and manage movie reviews.
- **TMDB Section**: Connect to an external API (TMDB) to view and add movies from their database.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, JWT for authentication.
- **Frontend**: Next.js, React.
- **Database**: MongoDB Atlas.
- **External API**: TMDB (The Movie Database).

---

## 2. Running the Application

Follow these steps to run the application locally.

### 1. Clone the repository

Clone the repository to your local machine and navigate to the project folder.

### 2. Install dependencies

#### Backend

1. Go to the **backend** folder.
2. Install the dependencies by running the following command:
   `pnpm install`

#### Frontend

1. Go to the **frontend** folder.
2. Install the dependencies by running the following command:
   `pnpm install`

### 3. MongoDB Atlas Configuration

Make sure you have an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a database. Then, configure your MongoDB URI in the `.env` file within the backend:

`MONGO_URI=your_mongo_uri`

### 4. Running the Application

#### Backend

1. In the **backend** folder, run the following command to start the server:

   `pnpm start`

#### Frontend

1. In the **frontend** folder, run the following command to start the development server:

   `pnpm run dev`

The application will be available at `http://localhost:3000`.

---

## Features

### 1. User Authentication

Users must register or log in to access certain features, such as adding movies to the list, creating reviews, and managing favorites. The authentication system uses JWT (JSON Web Tokens).

- **Registration**: Create a new account with a username and password.
- **Login**: User authentication with JWT.
- **Route Protection**: Protected routes are only accessible if the user is authenticated and has a valid token.

### 2. Movie Management

- **Movie List**: View all movies available in your database and filter by:
  - Title
  - Date
  - Rating
  - Platform
  - Genre

- **Sort Movies**: You can sort movies by **rating** or by **most recent**.

- **Favorites**: Add or remove movies from your favorite list.

- **Create Movies**: Authenticated users can add new movies with detailed information and a poster.

### 3. Movie Details and Reviews

When you click on a movie in the list, you can see the details of the movie, and if you are an authenticated user, you will have two options:
- **Write a Review**: Add your review of the movie.
- **Remove from List**: Delete the movie from your personal list.

### 4. TMDB Integration

- In the **More Movies** section, a list of movies fetched from the TMDB API is displayed.
- You can add these movies to your personal list.

---

## Additional Considerations

- **CORS**: If you encounter CORS issues in the backend, make sure the configuration is set up to allow requests from the frontend.
- **Environment Variables**: Ensure that environment variables are correctly configured in both the backend and frontend to enable communication with the database and TMDB API.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using **MarcosFlix**. I hope you enjoy managing your favorite movies! 🎬
