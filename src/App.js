import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { getUserAuth } from "../src/actions";
import { connect } from "react-redux";
import { useEffect } from "react";

function App(props) {
  useEffect(() => {
    props.getAuth();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/home"
            element={
              <Fragment>
                <Header></Header>
                <Home></Home>
              </Fragment>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    getAuth: () => dispatch(getUserAuth),
  };
};

export default connect(mapState, mapDispatch)(App);
