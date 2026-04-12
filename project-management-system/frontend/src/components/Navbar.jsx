
export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ background: "#333", color: "#fff", padding: "10px" }}>
      <span>Project System</span>
      <button style={{ float: "right" }} onClick={logout}>Logout</button>
      <button onClick={() => window.location.href="/activity"}>
  Activity
</button>
    </div>
  );
}