import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Inputs/Input";
import ProfilePhotoSelector from "../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../utils/helper";
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";
import uploadImage from "../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError('Please enter full name')
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return;
    }

    if (!password) {
      setError('Please enter the password')
      return;
    }
    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      })

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token)
        updateUser(response.data)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="w-full sm:w-[90%] md:w-[600px] lg:w-[700px] p-6 sm:p-8 lg:p-10 mx-auto flex flex-col justify-center bg-white rounded-xl shadow-md">
      <h3 className="text-xl sm:text-2xl font-bold text-black">Create an Account</h3>
      <p className="text-xs sm:text-sm text-slate-800 mt-2">
        Join us today by entering your details.
      </p>

      <form onSubmit={handleLogin} className="mt-5 space-y-4">

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
        />
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button type="submit" className="btn-primary w-full">SignUp</button>

        <p className="text-[13px] text-slate-800 mt-3 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>

  )
}

export default SignUp
