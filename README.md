# Scripts

### `npm install`
To install all project dependencies.

### `npm run dev`
To run the project in development mode.

### `npm run build`
To build the project sources, all resources are generated in the dist folder.

### `npm run prestart`
To run build script.

### `npm run start`
To run the project in production mode.

### `npm run test`
To run project tests.

# configuration

There are several files for the server configuration, in these files are the environment variables.

It is necessary to replace the file extension (ex: development.dist.js to development.js). Likewise, the character `~` must also be replaced by the corresponding value.

### To run thise server you need to generate autocertificate:
```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

# Structure
It is a structure based on middlewares, a division of the functionalities into small functions has been made.

Each function takes care of a single thing.

# Steps
### 1) Make sure you have node v14.5.0 installed.
### 2) Run:  `npm run install`.
### 3) Configure files, config files.
### 4) Generate autocertificates.
### 5) Run: `npm run build`.
### 6) Run:  `npm run start`.
