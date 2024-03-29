import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { BrowserRouter, Link, Route } from "react-router-dom";
import * as styles from "./app.css";
import { API_PATH } from "./constants/urls";
import { GlobalLoadingService } from "./helpers/loading-indicator";

let email = "";
let password= "";
let firstName = "";
let lastName = "";

const Index = () => (
  <h2>
    <button
      onClick={GlobalLoadingService.start}
    >
      Start loading
    </button>
    <button
      onClick={GlobalLoadingService.stop}
    >
      Stop loading
    </button>
  </h2>
);
const About = () => <h2><Books/></h2>;
const Users = () => <h2>{process.env.REACT_APP_ENV}</h2>;
const Login = () => {
  return (
    <div>
      <form onSubmit={register}>
        <input type="email" placeholder="Email" onChange={(e) => email = e.target.value}/>
        <input type="password" placeholder="Password" onChange={(e) => password = e.target.value}/>
        <input type="text" placeholder="First Name" onChange={(e) => firstName = e.target.value}/>
        <input type="text" placeholder="Last Name" onChange={(e) => lastName = e.target.value}/>
        <input type="submit" onChange={(e) => email = e.target.value}/>
      </form>
    </div>
  );
};

const register = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  fetch(`${API_PATH}/register`, {
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      password,
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const Books = () => (
  <Query
    query={gql`
      {
        books {
          title
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) { return <p>Loading...</p>; }
      if (error) { return <p>Error :(</p>; }

      return data.books.map(({ title }: {title: string}) => (
        <div key={title}>
          <p>{title}</p>
        </div>
      ));
    }}
  </Query>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <nav className={styles.body}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
          <li>
            <Link to="/login/">Login</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact={true} component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Route path="/login/" component={Login} />
    </div>
  </BrowserRouter>
);

export default AppRouter;
