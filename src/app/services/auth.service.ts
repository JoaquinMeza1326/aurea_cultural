import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
      if (typeof window !== 'undefined' && window.localStorage) {
          return localStorage.getItem('jwt');
      }
      return null;
  }

  setToken(token: string): void {
      if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('jwt', token);
      }
  }

  isAuthenticated(): boolean {
      return !!this.getToken();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('authorities');
    localStorage.removeItem('userId');
  }

  saveLogin(response: any){
    localStorage.setItem('jwt', response.jwtToken);
    localStorage.setItem('authorities', response.authorities);
    localStorage.setItem('userId', response.userId);
  }

  getAuthoritie(){
    if(localStorage.getItem('authorities') != null){
      return localStorage.getItem('authorities');
    }
    return null;
  }

  getIdUser(): number {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      return parseInt(userId);
    }
    return 0;
  }
}
