export default function Home() {
  const h1Styles = {
    fontSize: "42px",
    textAlign: "center",
    paddingTop: "100px",
  };

  return (
    <main>
      <h1 style={h1Styles}>
        Welcome to our Calendar Application!
        <p>Stay organized and never miss an important date</p>
      </h1>
    </main>
  );
}
