# WelshAcademy

A basic Angular project using:
- Transloco for i18n
- NgXS for state management
- ng-mocks to make easy mocks in unit tests
- Angular Material for fast design

# Run

```bash
# With npm
  npm install
  npm start
  # and go to http://localhost:4200

# With docker
  docker build . -t welshacademy
  docker run --rm -it -p 8100:8100 welshacademy
  # and go to http://localhost:8100
```

# Unit Test

````bash
  npm install
  npm test
````
