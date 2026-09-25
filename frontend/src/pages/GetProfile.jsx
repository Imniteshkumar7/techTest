import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetProfile = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://techtest-a7fl.onrender.com/api/profiles")
            .then((response) => {
                setProfiles(response.data.data || response.data);
                setError("");
            })
            .catch((err) => {
                console.error("Error fetching profiles:", err);
                setError("Failed to load profiles. Please ensure backend is running.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => {
        const profile = profiles.find((item) => (item.id || item._id) === id);
        navigate(`/edit-profile/${id}`, { state: { profile } });
    };

    if (loading) return <p>Loading profiles...</p>;

    return (
        <div>
            <h2>Profiles Directory</h2>

            {error && <p className="error-message">{error}</p>}

            {profiles.length === 0 ? (
                <p>No profiles found.</p>
            ) : (
                profiles.map((profile) => (
                    <div className="profile-card" key={profile.id || profile._id}>
                        <p><strong>ID:</strong> {profile.id}</p>
                        <h3>{profile.name}</h3>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                        <p><strong>Age:</strong> {profile.age}</p>
                        <button onClick={() => handleEdit(profile.id || profile._id)}>Edit Profile</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default GetProfile;