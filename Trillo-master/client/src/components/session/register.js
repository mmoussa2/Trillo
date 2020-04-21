import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";
import "./session.css";
import Home from "../home/home";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: ""
    };
  }
  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn, id: data.register.id }
    });
  }

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

  render() {
    return (
      <div>
        <Home />
        <Mutation
          mutation={REGISTER_USER}
          onCompleted={data => {
            const { token, id } = data.register;
            localStorage.setItem("id", id);
            localStorage.setItem("auth-token", token);

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
          {registerUser => (
            <div className="session" onClick={this.handleClick}>
              <div className="signup-form">
                <div className="error-message">
                  {this.renderErrors(this.state.errors)}
                </div>
                <form
                  className="session-form"
                  onSubmit={e => {
                    e.preventDefault();
                    registerUser({
                      variables: {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password
                      }
                    });
                  }}
                >
                  <input
                    value={this.state.name}
                    onChange={this.update("name")}
                    placeholder="Name"
                  />
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
                  <button type="submit">Sign up</button>
                </form>
              </div>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Register;
