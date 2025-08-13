import "./HomeContainer.css";

export default function HomeContainer({children}) {
    return (
      <>
        <main className="home-container">{children}</main>
      </>
    );
}