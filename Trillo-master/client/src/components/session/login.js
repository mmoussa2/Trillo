import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../graphql/mutations";
import "./session.css";
import Home from "../home/home";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }

  //new code

  renderErrors(errors) {
    if (errors === "") {
      return <div></div>;
    } else {
      return (
        <ul className="errors-box">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      );
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn, id: data.login.id }
    });
  }

  render() {
    return (
      <div>
        <Home />
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={data => {
            const { token, id } = data.login;
            localStorage.setItem("auth-token", token);
            localStorage.setItem("id", id);
            this.props.history.push("/boards");
          }}
          onError={({ graphQLErrors }) => {
            this.setState({
              errors: Object.values(graphQLErrors[0].message.split(","))
            });
            this.renderErrors(this.state.errors);
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {loginUser => (
            <div className="session">
              <div className="signin-form">
                <div className="error-message">
                  {this.renderErrors(this.state.errors)}
                </div>
                <form
                  className="session-form"
                  onSubmit={e => {
                    e.preventDefault();
                    loginUser({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    });
                  }}
                >
                  <input
                    value={this.state.email}
                    onChange={this.update("email")}
                    placeholder="Email"
                  />
                  <input
                    value={this.state.password}
                    onChange={this.update("password")}
                    type="password"
                    placeholder="Password"
                  />
                  <button type="submit">Log In</button>
                </form>
              </div>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Login;
