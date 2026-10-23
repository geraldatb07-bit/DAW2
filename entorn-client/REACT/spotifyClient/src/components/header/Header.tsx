import type { HeaderCardProps } from "./Types/HeaderCardProps";


const HeaderCard = ({ headerInfo }: HeaderCardProps) => {
    return (
        <header>
            <p>Usuari: {headerInfo.nom}</p>
            <p>Data: {headerInfo.data}</p>
        </header>
    )
}

export default HeaderCard;