import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const keys = req.params.keys();
    if( keys ) {
      for (const key of keys) {
        console.log(key, req.params.get(key));
      }
    }
    console.log('Am leaving now: ' + JSON.stringify(req.headers.has('name')));
    return next.handle(req);
  }
}
