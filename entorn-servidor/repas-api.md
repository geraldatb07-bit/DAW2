# Resum: Spotify API amb Node.js, Express i TypeScript

## Què és una API?

Una **API (Application Programming Interface)** és una manera perquè dues aplicacions es comuniquin i intercanviïn dades.

En el nostre projecte:

* El navegador actua com a **client**.
* El servidor fet amb **Node.js + Express** actua com a **API**.
* Les dades normalment s'envien i es reben en format **JSON**.

El funcionament bàsic és:

1. El client envia una **petició (request)** al servidor.
2. L'API rep la petició.
3. El servidor processa la informació.
4. El servidor envia una **resposta (response)**.
5. El client rep les dades.

```text
CLIENT                API / SERVIDOR
Navegador  ────────►  Express
           GET /videojocs

Navegador  ◄────────  JSON
           [{...}, {...}]
```

---

## Mètodes HTTP principals

| Mètode   | Funció                    | Exemple               |
| -------- | ------------------------- | --------------------- |
| `GET`    | Consultar o llistar dades | `GET /videojocs`      |
| `POST`   | Afegir dades noves        | `POST /videojocs`     |
| `PUT`    | Modificar dades           | `PUT /videojocs/1`    |
| `DELETE` | Eliminar dades            | `DELETE /videojocs/1` |

### Exemples

```http
GET /videojocs
```

Retorna tots els videojocs.

```http
GET /videojocs/1
```

Retorna el videojoc amb ID `1`.

```http
POST /videojocs
```

Crea un videojoc nou.

```http
PUT /videojocs/1
```

Modifica el videojoc amb ID `1`.

```http
DELETE /videojocs/1
```

Elimina el videojoc amb ID `1`.

---

# Crear el projecte

## 1. Crear la carpeta

```powershell
mkdir spotify-api
```

Crea una carpeta anomenada `spotify-api`.

## 2. Entrar a la carpeta

```powershell
cd spotify-api
```

Ens situa dins de la carpeta del projecte.

## 3. Inicialitzar Node.js

```powershell
npm init -y
```

Crea el fitxer `package.json`, que conté informació, dependències i scripts del projecte.

## 4. Instal·lar Express

```powershell
npm install express
```

Express facilita la creació del servidor i de les rutes de l'API.

## 5. Instal·lar TypeScript

```powershell
npm install -D typescript tsx @types/node @types/express
```

Què instal·la cada paquet?

* `typescript` → permet utilitzar TypeScript.
* `tsx` → permet executar directament fitxers `.ts`.
* `@types/node` → afegeix els tipus de Node.js.
* `@types/express` → afegeix els tipus d'Express.
* `-D` → indica que són dependències de desenvolupament.

## 6. Crear el `tsconfig.json`

```powershell
npx tsc --init
```

El fitxer `tsconfig.json` conté la configuració de TypeScript.

---

# Estructura mínima del projecte

```text
spotify-api/
├── node_modules/
├── src/
│   └── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

### Què és cada element?

* **`src/`** → carpeta on guardem el nostre codi.
* **`index.ts`** → fitxer principal de l'API.
* **`node_modules/`** → llibreries instal·lades amb npm.
* **`package.json`** → configuració i dependències del projecte.
* **`package-lock.json`** → versions exactes de les dependències.
* **`tsconfig.json`** → configuració de TypeScript.
* **`.gitignore`** → indica a Git quins fitxers o carpetes no ha de pujar.

---

# Crear una API mínima

Fitxer `src/index.ts`:

```typescript
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionant!");
});

app.get("/videojocs", (req, res) => {
    res.json([
        { id: 1, nom: "Minecraft" },
        { id: 2, nom: "GTA V" }
    ]);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionant a http://localhost:${PORT}`);
});
```

---

# Com encendre l'API

Podem executar directament:

```powershell
npx tsx src/index.ts
```

Si funciona correctament:

```text
Servidor funcionant a http://localhost:3000
```

Podem entrar des del navegador a:

```text
http://localhost:3000
```

O consultar els videojocs:

```text
http://localhost:3000/videojocs
```

---

# Crear una comanda per iniciar l'API

Podem modificar el `package.json` i afegir:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts"
  }
}
```

Ara podem encendre l'API simplement amb:

```powershell
npm run dev
```

`tsx watch` detecta canvis en el codi i **reinicia automàticament el servidor**.

Per aturar-lo:

```text
Ctrl + C
```

---

# Què és `localhost`?

Quan escrivim:

```text
http://localhost:3000
```

`localhost` representa **el nostre propi ordinador**.

El número `3000` és el **port** on està funcionant el servidor.

```text
localhost:3000
          └── port
```

Es poden utilitzar altres ports:

```text
localhost:4000
localhost:5000
localhost:8080
```

sempre que no estiguin ocupats.

---

# Request i Response

En Express trobarem molt sovint:

```typescript
(req, res)
```

## `req` — Request

Representa la petició i les dades que envia el client.

Exemples:

```typescript
req.params
req.query
req.body
```

## `res` — Response

Serveix per enviar una resposta al client.

```typescript
res.send("Hola");
```

O enviar JSON:

```typescript
res.json({
    missatge: "Hola"
});
```

---

# Paràmetres de ruta

Podem crear una ruta amb un valor variable:

```typescript
app.get("/videojocs/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        id: id
    });
});
```

Si fem:

```http
GET /videojocs/5
```

Podem obtenir el `5` mitjançant:

```typescript
req.params.id
```

El `:id` indica que aquesta part de la URL és **variable**.

---

# Rebre dades amb POST

Per poder rebre JSON necessitem:

```typescript
app.use(express.json());
```

Després podem crear:

```typescript
app.post("/videojocs", (req, res) => {
    const videojoc = req.body;

    console.log(videojoc);

    res.json(videojoc);
});
```

El client podria enviar:

```json
{
  "nom": "Minecraft",
  "preu": 29.99
}
```

Podem accedir a aquestes dades amb:

```typescript
req.body.nom
req.body.preu
```

---

# Codis d'estat HTTP

Els codis HTTP indiquen què ha passat amb una petició.

| Codi  | Significat                |
| ----- | ------------------------- |
| `200` | OK                        |
| `201` | Creat correctament        |
| `400` | Petició incorrecta        |
| `404` | No trobat                 |
| `500` | Error intern del servidor |

Exemple:

```typescript
res.status(201).json({
    missatge: "Videojoc creat"
});
```

Si no existeix:

```typescript
res.status(404).json({
    error: "Videojoc no trobat"
});
```

---

# Com provar l'API?

Les peticions `GET` senzilles es poden provar directament des del navegador:

```text
http://localhost:3000/videojocs
```

Per provar `POST`, `PUT` i `DELETE` podem utilitzar:

* **Postman**
* **Insomnia**
* **Thunder Client** a VS Code

Aquestes eines permeten seleccionar:

```text
Mètode: POST
URL: http://localhost:3000/videojocs
```

I enviar un `body` en JSON:

```json
{
  "nom": "Minecraft",
  "preu": 29.99
}
```

---

# Què és una API REST?

Una **API REST** organitza les operacions utilitzant recursos, rutes i mètodes HTTP.

Per exemple:

```text
GET     /videojocs
GET     /videojocs/1
POST    /videojocs
PUT     /videojocs/1
DELETE  /videojocs/1
```

La ruta representa el **recurs**:

```text
/videojocs
```

I el mètode HTTP indica **què volem fer** amb aquest recurs.

---

# Client i servidor

```text
CLIENT                         SERVIDOR

HTML                           Node.js
CSS              HTTP          Express
JavaScript  ───────────────►   API
            ◄───────────────
                  JSON
```

### Client

S'encarrega principalment de:

* Mostrar la interfície.
* Interactuar amb l'usuari.
* Enviar peticions al servidor.
* Mostrar les dades rebudes.

### Servidor

S'encarrega principalment de:

* Rebre peticions.
* Validar dades.
* Aplicar la lògica del programa.
* Accedir a bases de dades.
* Retornar respostes.

---

# `.gitignore`

No hem de pujar `node_modules` a GitHub.

Creem un fitxer:

```text
.gitignore
```

Amb:

```gitignore
node_modules/
dist/
.env
```

Si descarreguem el projecte de GitHub i no tenim `node_modules`, simplement executem:

```powershell
npm install
```

npm llegirà el `package.json` i tornarà a instal·lar les dependències.

---

# Comandes importants

| Comanda                                                    | Funció                                  |
| ---------------------------------------------------------- | --------------------------------------- |
| `npm init -y`                                              | Inicialitza Node.js                     |
| `npm install express`                                      | Instal·la Express                       |
| `npm install -D typescript tsx @types/node @types/express` | Instal·la TypeScript i tipus            |
| `npx tsc --init`                                           | Crea `tsconfig.json`                    |
| `npx tsx src/index.ts`                                     | Executa l'API                           |
| `npm run dev`                                              | Encén l'API en mode desenvolupament     |
| `Ctrl + C`                                                 | Atura el servidor                       |
| `npm install`                                              | Instal·la les dependències del projecte |

---

# Recordatori ràpid

* **Node.js** → executa JavaScript fora del navegador.
* **Express** → facilita la creació de servidors i APIs.
* **TypeScript** → JavaScript amb tipus.
* **API** → permet la comunicació entre aplicacions.
* **HTTP** → protocol de comunicació entre client i servidor.
* **GET** → consultar.
* **POST** → crear.
* **PUT** → modificar.
* **DELETE** → eliminar.
* **JSON** → format habitual per intercanviar dades.
* **localhost** → el nostre propi ordinador.
* **port** → punt on escolta el servidor.
* **req** → petició que arriba al servidor.
* **res** → resposta que envia el servidor.
* **npm** → gestor de paquets de Node.js.
* **package.json** → configuració i dependències.
* **node_modules** → llibreries instal·lades.
* **npm run dev** → comanda habitual per encendre l'API.
