import {Router, RouterConfiguration}  from 'aurelia-router';

export class App {
  router: Router;
  title = 'Microservices Test UI';

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Microservices Test UI';
    config.map([
      { route: '', moduleId: 'home', title: 'Home' }
    ]);

    this.router = router;
  }
}
