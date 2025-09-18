export default function Game({scrollX}: {scrollX: number}) {
    console.log("Game render, scrollX:", scrollX)
    return <div style={{ width: "1000px", height: "100%", background: "linear-gradient(to right, #ff7e5f, #feb47b)"}}>Game Component</div>;
}