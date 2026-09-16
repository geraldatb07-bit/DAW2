# Resum: Mini API amb Node.js, Express i TypeScript

## Què és una API?

Una API (Application Programming Interface) és una manera perquè dues
aplicacions es comuniquin i intercanviïn dades.

En el nostre projecte, el navegador actua com a **client** i el servidor
Express actua com a **API**.

El funcionament bàsic és:

1.  El client envia una petició al servidor.
2.  L'API rep la petició.
3.  El servidor processa la informació.
4.  L'API retorna una resposta, normalment en format JSON.

## Mètodes HTTP principals

  Mètode   Funció
  -------- ---------------------------
  GET      Consultar o llistar dades
  POST     Afegir dades noves
  PUT      Modificar dades
  DELETE   Eliminar dades

## Exemple de ruta

``` http
GET /videojocs
```

Aquesta ruta podria retornar una llista de videojocs en format JSON.

## Les 5 comandes bàsiques per crear el projecte

### 1. Crear la carpeta del projecte

``` powershell
mkdir mini-api
```

Crea una carpeta anomenada `mini-api`.

### 2. Entrar a la carpeta

``` powershell
cd mini-api
```

Ens situa dins de la carpeta del projecte.

### 3. Inicialitzar el projecte Node.js

``` powershell
npm init -y
```

Crea el fitxer `package.json`, que conté la informació i la configuració
del projecte.

### 4. Instal·lar Express

``` powershell
npm install express
```

Instal·la Express, una eina que facilita la creació del servidor i de
les rutes de l'API.

### 5. Instal·lar TypeScript i les eines necessàries

``` powershell
npm install -D typescript tsx @types/node @types/express
```

Instal·la TypeScript i les eines de desenvolupament necessàries per
treballar amb Node.js i Express.

## Estructura mínima del projecte

``` text
mini-api/
├── node_modules/
├── src/
│   └── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Recordatori

-   `Node.js` permet executar JavaScript fora del navegador.
-   `Express` ajuda a crear el servidor i les rutes.
-   `TypeScript` afegeix tipus al JavaScript.
-   `JSON` és un format habitual per enviar i rebre dades.
-   L'API connecta el client amb les dades del servidor.

