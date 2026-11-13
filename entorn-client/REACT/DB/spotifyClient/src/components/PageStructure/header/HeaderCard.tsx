import { useState } from "react";
import type { HeaderCardProps } from "./Types/HeaderCardProps";


const HeaderCard = ({ headerInfo }: HeaderCardProps) => {
    const [data, setData] = useState(headerInfo.data);

    function actualitzarData() {
        setData(new Date().toLocaleString("ca-ES"));
    }


    return (
        <header className="header-component">
            <h4>Usuari: {headerInfo.nom}</h4>
            <h4>Data i hora: {data}</h4>
            <button onClick={actualitzarData}>Actualitzar data</button>
        </header>
    )
}

export default HeaderCard;