// Protege TODO el sitio con usuario + contraseña (HTTP Basic Auth).
// La contraseña NO va en este archivo: se configura en Netlify como variable
// de entorno (Site configuration → Environment variables):
//   SITE_USER  = atache        (o el usuario que quieras)
//   SITE_PASS  = tu-contraseña  (elige una robusta)
//
// Mientras no definas las variables, usa el usuario/contraseña por defecto de
// más abajo (cámbialos igualmente).

export default async (request, context) => {
  const USER = Netlify.env.get("SITE_USER") || "atache";
  const PASS = Netlify.env.get("SITE_PASS") || "cambia-esta-clave";

  const expected = "Basic " + btoa(`${USER}:${PASS}`);
  const provided = request.headers.get("authorization") || "";

  if (provided !== expected) {
    return new Response("Acceso restringido · Canal B2B Atache", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Atache - Canal B2B Online", charset="UTF-8"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // Credenciales correctas → sirve el sitio normalmente.
  return context.next();
};
