import type { HeaderCardProps } from "./Types/headerCardProps";


const HeaderCard = ({ headerInfo }: HeaderCardProps) => {
    return (
        <>
            <p>Usuari: {headerInfo.nom}</p>
            <p>Data: {headerInfo.data}</p>
        </>
    )
}

export default HeaderCard;