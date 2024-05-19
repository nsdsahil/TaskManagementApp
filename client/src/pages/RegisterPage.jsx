import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [registrationError, setRegistrationError] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
            console.log(username, email, password)
			const { data } = await axios.post("http://localhost:4000/api/users/register", {
				username,
				email,
				password,
			});
			localStorage.setItem("authToken", data.token);
			window.location.href = "/dashboard";
		} catch (err) {
			setRegistrationError("Registration failed. Please try again.");
			console.error(err);
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Register</h2>
			<form onSubmit={handleRegister}>
				<div className="mb-3">
					<input
						type="text"
						className="form-control"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
					/>
				</div>
				<div className="mb-3">
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
				</div>
				<button type="submit" className="btn btn-primary mb-3">Register</button>
				{registrationError && <p className="text-danger">{registrationError}</p>}
			</form>
		</div>
	);
};

export default RegisterPage;
