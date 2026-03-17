import { useState } from "react";
import "./App.css";

const mockSignUp = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 1000));

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(""); // REFACTOR: use enum
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    if (!email.split("@")[1].includes(".")) {
      setError("INVALID_EMAIL");
      return true;
    }

    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      setError("INVALID_PASSWORD");
      return true;
    }

    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const validationErrors = validate();

    if (validationErrors) {
      return;
    }
    await mockSignUp({ email, password });

    setIsSubmitted(true);
  };
  return (
    <div className="wrapper">
      <h1>Sign up Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            className={error === "INVALID_EMAIL" ? "invalid" : ''}
          />
          {error === "INVALID_EMAIL" && <p className="error">Invalid Email</p>}
        </div>

        <div className="field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            className={error === "INVALID_PASSWORD" ? "invalid" : ''}
          />
          {error === "INVALID_PASSWORD" && (
            <p className="error">Invalid Password</p>
          )}
        </div>

        <button type="submit">Submit</button>
        {isSubmitted && <p className="submitted">Form was submitted</p>}
      </form>
    </div>
  );
}

export default App;
