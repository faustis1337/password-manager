import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('jwtToken'); // Replace with your storage method
    },
    // Add other options here if needed
  };
}

export const jwtOptionsProvider = {
  provide: JWT_OPTIONS,
  useFactory: jwtOptionsFactory,
};
