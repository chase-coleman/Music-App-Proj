import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import axios from "axios"

const Navbar = () => {
  
  const userLogout = async () => {
    const userToken = localStorage.getItem('token')
    console.log(userToken)
    const logoutUrl = 'http://127.0.0.1:8000/api/v1/users/logout/'
    try {
      const response = await axios.post(logoutUrl, {},
        {
          headers: {
            Authorization: `Token ${userToken}`
          },
        },
      );
      console.log(response.data)
      localStorage.removeItem('token')
    } catch (error){
      console.error("Error:", error)
    }
  }

  return (
    <>
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1 flex items-center justify-center ">
    <a className="btn btn-ghost text-xl">daisyUI</a>
    <Nav.Link as={Link} to="/playlists">Playlists</Nav.Link>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><button onClick={userLogout}>Logout</button></li>
      </ul>
    </div>
  </div>
</div>  
    </>
  )
}

export default Navbar

