import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
	//Alternate method to initialize state object without using contructor method with super(props)
	state = { lat: null, errorMessage: "" };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ lat: position.coords.latitude }),
			(err) => this.setState({ errorMessage: err.message })
		);
	}

	componentDidUpdate() {
		console.log("My component was just updated - it rerendered");
	}

  renderContent(){
    if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>;
		}

		if (!this.state.errorMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />;
		}

		return <Spinner message="Please accept location request" />;
  }


	//React says we have to define render!!
	render() {
	 return (
      <div className="border red">
        {this.renderContent()}
      </div>
   );
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));
