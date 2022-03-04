import { useNavigate, Link  } from "react-router-dom";

function LoggedIn({setCurrentUser, currentUser}) {
    const navigate = useNavigate();
    function handleLogout() {
        fetch("/logout", {
            method: 'DELETE'
        })
        navigate('/')
        setCurrentUser(null)
      }
    return (
        <div>
            <h1>{currentUser.username}</h1>
            <Link to="/" className="n-btn icon" onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default LoggedIn
