import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  console.log('Token présent:', !!token);
  
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('Headers envoyés:', cloned.headers.get('Authorization'));
    return next(cloned);
  }
  
  console.warn('Aucun token trouvé');
  return next(req);
}; 