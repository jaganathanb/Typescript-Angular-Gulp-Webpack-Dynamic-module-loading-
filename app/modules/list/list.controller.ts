
class ListController {
      apps: Array<Object>;
      constructor() {
            this.apps = [
                  { name: 'Gmail' },
                  { name: 'Facebook' },
                  { name: 'Twitter' },
                  { name: 'LinkedIn' }
            ];
            this.title = 'Applications'
      }
}

export = ListController;