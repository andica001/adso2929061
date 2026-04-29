<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminUser
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    // Verificamos si el usuario está logueado y si su rol es 'admin'
    if (auth()->user()->role == 'Admin') {
        return $next($request);
    }

    // Si no es admin, lo redirigimos al home o lanzamos un error 403
    return redirect('/dashboard')->with('error', 'No tienes permisos de administrador.');
}
}
