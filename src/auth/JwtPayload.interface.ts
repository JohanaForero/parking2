export interface JwtPayload {
  exp: number; // Fecha de expiración del token
  iat: number; // Fecha de emisión del token
  jti: string; // ID del token
  iss: string; // Emisor del token
  aud: string; // Audiencia
  sub: string; // ID del sujeto (usuario)
  typ: string; // Tipo del token (e.g., "Bearer")
  azp: string; // Cliente autorizado
  session_state: string; // Estado de la sesión
  realm_access: {
    roles: string[]; // Roles del usuario
  };
  resource_access: any; // Accesos a recursos
  scope: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
