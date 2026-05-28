import BtnBack from "../components/BtnBack";

function Bulbasaur() {
    return (
        <div style={{ border: "4px solid green", 
        padding: "1rem", 
        backgroundColor: "#e0ffe0", 
        marginBottom: "1rem", 
        color: "#333", with: "80%" }}>
            <h3>Bulbasaur</h3>
            <h5>Ataque: Latigo Cepa</h5>
            <p>Tipo: Planta/Veneno</p>
        </div>
    );
}

function Pikachu() {
    return (
        <div style={{ border: "4px solid orange", padding: "1rem", backgroundColor: "#fffacd", marginBottom: "1rem", color: "#333", width: "80%" }}>
            <h3>Pikachu</h3>
            <h5>Ataque: Rayo</h5>
            <p>Tipo: Eléctrico</p>
        </div>
    );
}

function Charmander() {
    return (
        <div style={{ border: "4px solid orange", padding: "1rem", backgroundColor: "#ffe0e0", marginBottom: "1rem", color: "#333", width: "80%" }}>
            <h3>Charmander</h3>
            <h5>Ataque: Lanzallamas</h5>
            <p>Tipo: Fuego</p>
        </div>
    );
}
export default function Example1Components() {

    return (
        <div className="container">
            <BtnBack /> 
            <h2>Example1: Components</h2>
            <p> Create Independent and Reusable Components</p>
            <div style={{display: "flex",flexWrap: "wrap", justifyContent: "center", gap: "1rem" ,margin: "1.4rem 0" ,color: "#333"}}>
                <Bulbasaur />
                <Pikachu />
                <Charmander />
            </div>
        </div>
    );
}