# Notice: Repository Deprecation
This repository is deprecated and no longer actively maintained. It contains outdated code examples or practices that do not align with current MongoDB best practices. While the repository remains accessible for reference purposes, we strongly discourage its use in production environments.
Users should be aware that this repository will not receive any further updates, bug fixes, or security patches. This code may expose you to security vulnerabilities, compatibility issues with current MongoDB versions, and potential performance problems. Any implementation based on this repository is at the user's own risk.
For up-to-date resources, please refer to the [MongoDB Developer Center](https://mongodb.com/developer).

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

