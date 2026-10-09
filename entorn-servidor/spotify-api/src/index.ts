import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { Track } from "./interfaces/data/track";
import { isValidTrack } from "./validators/track.validator";
import { randomUUID } from "crypto";
import { Artist } from "./interfaces/artist/artist";
import { isValidArtist } from "./validators/artist.validador";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { Country } from "./interfaces/Country/country";
import { countries } from "./data/country/country.data";
import { isValidCountry } from "./validators/country.validator";
import { User, UserInput } from "./interfaces/User/user";
import { isValidUser } from "./validators/user.validator";
import { users } from "./data/user/user.data";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "./Services/trackService";
import type { TrackBD } from "./interfaces/track/trackBD";
import type { ErrorService } from "./interfaces/error/errorService";
import type { SuccessService } from "./interfaces/error/sucessService";
import type { UpdateSuccessService } from "./interfaces/error/updateSuccessService";
import type { DeleteSuccessService } from "./interfaces/error/deleteSuccessService";

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(getAllTracks());
});

app.get("/tracks/:id", (req: Request, res: Response) => {

    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string);

    if (!findTrack) {
        return res.status(404).json({ message: `Track ${req.params.id} not found` })
    }
    return res.status(200).json(findTrack);
});



app.post("/tracks", (req: Request, res: Response) => {
    const result: SuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: result.message });
    }
    tracks.push((result as SuccessService<TrackBD>).data);
    return res.status(result.code).json(result);
});

app.put("/tracks/:id", (req: Request, res: Response) => {
    const result: UpdateSuccessService<TrackBD> | ErrorService = updateTrack(req.params.id as string, req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: result.message });
    }
    return res.status(result.code).json(result);
});

app.delete("/tracks/:id", (req: Request, res: Response) => {
    const result: DeleteSuccessService | ErrorService = deleteTrack(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: result.message });
    }

    return res.status(result.code).send();
});

const artists: Artist[] = [];
app.post("/artists", (req: Request, res: Response) => {
    const artist: Artist = req.body;
    if (!isValidArtist(artist)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const uuid: string = randomUUID();
    const artistRecord: ArtistBD = {
        id: uuid,
        pseudonim: artist.pseudonim.trim().replace(/\s+/g, " "),
        nom: artist.nom.trim().replace(/\s+/g, " "),
        pais: artist.pais
    };

    artists.push(artistRecord);
    return res.status(201).json(artists);
})

app.get("/artists", (_req: Request, res: Response) => {
    return res.status(200).json(artists);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
});

app.post("/countries", (req: Request, res: Response) => {
    const country: Country = req.body;
    if (!isValidCountry(country)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const uuid: string = randomUUID();
    const countryRecord: Country = {
        id: uuid,
        countryName: country.countryName.trim()
    };

    countries.push(countryRecord);
    return res.status(201).json(countryRecord);
});

app.get("/countries", (_req: Request, res: Response) => {
    return res.status(200).json(countries);
});

app.put("/countries/:id", (req: Request, res: Response) => {
    const country: Country = req.body;
    if (!isValidCountry(country)) {
        return res.status(400).json({ message: "Invalid data" })
    }

    const idCountry: string = req.params.id as string;
    const index: number = countries.findIndex((c: Country) => { return c.id === idCountry; });

    if (index === -1) {
        return res.status(404).json({ message: `Track ${idCountry} not found` });
    }

    countries[index] = {
        id: idCountry,
        countryName: country.countryName.trim().replace(/\s+/g, " "),
    };

    return res.status(200).json(countries[index]);
});


// app.post("/users", (req: Request, res: Response) => {
//     const user: UserInput = req.body;
//     if (!isValidUser(user)) {
//         return res.status(400).json({ message: "Invalid data" });
//     }

//     const countryExists: boolean = countries.some((country: Country) => country.id === user.country);
//     if (!countryExists) {
//         return res.status(400).json({ message: "Country not found" });
//     }

//     const uuid: string = randomUUID();
//     const userRecord: User = {
//         id: uuid,
//         email: user.email.trim(),
//         country: user.country
//     };

//     users.push(userRecord);
//     return res.status(201).json(userRecord);
// });

// app.get("/users", (_req: Request, res: Response) => {
//     return res.status(200).json(users);
// });

// app.get("/users/:id", (req: Request, res: Response) => {
//     const idUser: string = req.params.id as string;
//     const user: User | undefined = users.find((item: User) => item.id === idUser);

//     if (!user) {
//         return res.status(404).json({ message: `User ${idUser} not found` });
//     }

//     return res.status(200).json(user);
// });

// app.put("/users/:id", (req: Request, res: Response) => {
//     const user: UserInput = req.body;
//     if (!isValidUser(user)) {
//         return res.status(400).json({ message: "Invalid data" });
//     }

//     const idUser: string = req.params.id as string;
//     const index: number = users.findIndex((item: User) => item.id === idUser);

//     if (index === -1) {
//         return res.status(404).json({ message: `User ${idUser} not found` });
//     }

//     const countryExists: boolean = countries.some((country: Country) => country.id === user.country);
//     if (!countryExists) {
//         return res.status(400).json({ message: "Country not found" });
//     }

//     users[index] = {
//         id: idUser,
//         email: user.email.trim(),
//         country: user.country
//     };

//     return res.status(200).json(users[index]);
// });

// app.delete("/users/:id", (req: Request, res: Response) => {
//     const idUser: string = req.params.id as string;
//     const index: number = users.findIndex((user: User) => user.id === idUser);

//     if (index === -1) {
//         return res.status(404).json({ message: `User ${idUser} not found` });
//     }

//     users.splice(index, 1);
//     return res.status(204).send();
// });



// app.post("/users", (req: Request, res: Response) => {
//     const users: User = req.body;
//     if (!isValidUser(users)) {
//         return res.status(400).json({ message: "Invalid data" });
//     }
//     const uuid: string = randomUUID();
//     const userRecord: Country = {
//         id: uuid,
//         email: string,
//         country: Country.
//     };

//     users.push(userRecord);
//     return res.status(201).json(userRecord);
// });

// app.get("/users", (_req: Request, res: Response) => {
//     return res.status(200).json(users);
// });

// app.put("/users/:id", (req: Request, res: Response) => {
//     const users: User = req.body;
//     if (!isValidUser(users)) {
//         return res.status(400).json({ message: "Invalid data" })
//     }

//     const idUser: string = req.params.id as string;
//     const index: number = users.findIndex((u: Users) => { return u.id === idUser; });

//     if (index === -1) {
//         return res.status(404).json({ message: `Track ${idUser} not found` });
//     }

//     users[index] = {
//         id: idUser,
//         countryName: user.id.trim().replace(/\s+/g, " "),
//     };

//     return res.status(200).json(countries[index]);
// });

// app.delete("/users/:id", (req: Request, res: Response) => {


//     const idUser: string = req.params.id as string;
//     const index: number = users.findIndex((u: Track) => { return u.id === idUser; });

//     if (index === -1) {
//         return res.status(404).json({ message: `User ${idUser} not found` });
//     }

//     tracks.splice(index, 1);
//     return res.status(204).json({ message: "User deleted" })
// });