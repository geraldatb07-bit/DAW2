import type { HeaderCardProps } from "./Types/HeaderCardProps";


const HeaderCard = ({ headerInfo }: HeaderCardProps) => {
    return (
        <header className="header-component">
            <h4>Usuari: {headerInfo.nom}</h4>
            <h4>Data: {headerInfo.data}</h4>
        </header>
    )
}

export default HeaderCard;