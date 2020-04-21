// import React from "react";
import React, { Component } from "react";
import "./home.css";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../graphql/mutations";

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: ""
    };
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn, id: data.login.id }
    });
  }

  render() {
    return (
      <div className="home-content">
        <h1>Trillo lets you work more collaboratively </h1>
        <h1> and get more done.</h1> <br />
        <h2>Trillo's boards, lists, and cards enable you </h2>
        <h2> to organize and prioritize your projects </h2>
        <h2> in a fun, flexible, and rewarding way</h2>
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={data => {
            const { token, id } = data.login;
            localStorage.setItem("auth-token", token);
            localStorage.setItem("id", id);
            this.props.history.push("/boards");
          }}
          // onError={({ graphQLErrors }) => {
          //   this.setState({
          //     errors: Object.values(graphQLErrors[0].message.split(","))
          //   });
          //   this.renderErrors(this.state.errors);
          // }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {loginUser => (
            <form className="home-form">
              {/* <input type="text" placeholder="Email" />
        <button>Sign Up - It's Free!</button> */}
              <button
                className="demo-user-btn"
                onClick={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      email: "testUser100@gmail.com",
                      password: "12345678"
                    }
                  });
                }}
              >
                Demo Login
              </button>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default HomeContent;
