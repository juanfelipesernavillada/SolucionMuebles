// ============================================================
// MUEBLES MEDELLÍN
// Bloque 1.2 — Middleware centralizado de errores
// ============================================================

function errorHandler(err, req, res, next) {

    // --------------------------------------------------------
    // 1. Registrar el error internamente
    // --------------------------------------------------------

    console.error('Error de aplicación:', err);


    // --------------------------------------------------------
    // 2. Si ya comenzamos a enviar la respuesta,
    //    dejamos que Express continúe con su manejador.
    // --------------------------------------------------------

    if (res.headersSent) {
        return next(err);
    }


    // --------------------------------------------------------
    // 3. Determinar el código HTTP
    // --------------------------------------------------------

    const statusCode =
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode < 600
            ? err.statusCode
            : 500;


    // --------------------------------------------------------
    // 4. Respuesta segura para el cliente
    // --------------------------------------------------------

    res.status(statusCode).send(
        'Ha ocurrido un error en el servidor. Intenta nuevamente más tarde.'
    );
}


module.exports = errorHandler;