/// <reference path="../../typings/tsd.d.ts" />

class HomeController {
  message: string;
  title: string;
  constructor() {
    this.message = 'This is home!';
    this.title = 'Home Module'
  }
}

export = HomeController;