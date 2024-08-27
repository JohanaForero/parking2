import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string) {
    console.log(token);
    try {
      const decoded = this.jwtService.verify(token, {
        algorithms: ['RS256'],
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2D87KAcCVUprr8qF/DG3IRfXww3gUKzmIkIQfLXrNOIgITKTbJY2KR9/QzCBRGoxpAcGwEFjFMdq3yDH97o0h/znwXFfP5d6aAV4Lf1EASvO5FEdCYgwSwxes7wIOQGNKavzieoJRe8/6N3du0W6vYyft9Oev5LdqtkVLloFniYDf0UNvqCEn4IzamMRE+h8iTkZNQ0NUByW0kIF7AL8bHmFXvSsJ8TpMrBLWmUY4ul6yPxw7BJdzWDENZ88w5ekGly7Y/LPAOtqk9JzbdrTzYMNR84wv73CfDW1To63ieskRBh/4xUd0V+ZOyNIbItS5KDCB2OS5VJPDAGPcpZqEwIDAQAB',
     // La clave pública que se usa para verificar el token
      });
      return decoded;
    } catch (error) {
      console.error('Error al verificar el token:', error.message);
      throw new Error('Token inválido');
    }
  }
  // Implementa métodos para manejar usuarios, validaciones, etc.
}
