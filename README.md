# Rockets Store

Demo Angular web app.

## Generate an API key

1. Open the `M001` project in MongoDB Atlas.
1. Click on the `App Services` tab and select the `Rocket Store` app.
1. Open the `Authentication` from the left sidebar and select `API Keys`.
1. Create a new key and copy its value.

## Running the app

1. Clone the Github repo
1. Open `src/environments/environment.ts` and replace the value of `API_KEY` with the key you just generated.
1. Install the dependencies and run the development server:

```
npm install
ng serve -o
```

