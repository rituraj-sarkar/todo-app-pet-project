import axios from "axios";
import { useNavigate } from "react-router-dom";
function Logout({ setLoggedInUser }) {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8088/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentails: true,
      });
      console.log(res);
      setLoggedInUser(undefined);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Logout">
      <button onClick={(e) => handleLogout(e)}>logout</button>
    </div>
  );
}

export default Logout;