export const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 50,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          Built With Interest by{""}
          <span>
            <a
              style={{ color: "white" }}
              className="nav-link"
              href={"https://github.com/arjo31"}
            >
              Arjo Kundu
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};
