import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <a href="/signup" className="home-button signup">
        Sign up
      </a>
      <a href="/login" className="home-button login">
        Login
      </a>
    </div>
  );
}

export default Home;
