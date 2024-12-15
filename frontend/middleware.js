import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Obtener el token desde las cookies
  const token = req.cookies.get('token')?.value;

  console.log('Middleware ejecutándose para:', pathname);
  console.log('Token encontrado:', token);

  // Redirigir a /auth si no hay token y la ruta es protegida
  const protectedRoutes = ['/movie/create', '/profile', '/web'];
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Permitir la solicitud si no es una ruta protegida o si hay token
  return NextResponse.next();
}

// Configuración para especificar las rutas protegidas
export const config = {
  matcher: ['/movie/create', '/profile', '/web'], // Rutas protegidas
};
