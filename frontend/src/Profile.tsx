import React, { useEffect, useState } from "react";
import axios from "axios";

interface Profile {
    username : string;
    email : string;
};

const Profile : React.FC = () => {

    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {
            try{
                const token = localStorage.getItem('token');
                const res = await axios.get("http://localhost:3000/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(res.data);
            }
            catch(error){
                setError("Failed to fetch the profile !");
            }
        }

        fetchProfile();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        setProfile(null); 
    };

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div>
        <h2>Welcome, {profile.username}!</h2>
        <p>Email: {profile.email}</p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;