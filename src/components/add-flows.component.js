import React, { Component } from "react";
import FlowsDataService from "../services/flows.service";

export default class AddFlows extends Component {
  constructor(props) {
    super(props);
    this.onChangeFlow = this.onChangeFlow.bind(this);
    this.onChangeFiles = this.onChangeFiles.bind(this);
    this.saveFlow = this.saveFlow.bind(this);
    this.newFlow = this.newFlow.bind(this);

    this.state = {
      id: null,
      flow: "",
      files: "", 
      published: false,

      submitted: false
    };
  }

  onChangeFlow(e) {
    this.setState({
      flow: e.target.value
    });
  }

  onChangeFiles(e) {
    this.setState({
      files: e.target.value
    });
  }

  saveFlow() {
    var data = {
      flow: this.state.flow,
      files: this.state.files
    };

    FlowsDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          flow: response.data.flow,
          files: response.data.files,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFlow() {
    this.setState({
      id: null,
      flow: "",
      files: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newFlow}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Flow</label>
              <input
                type="text"
                className="form-control"
                id="flow"
                required
                value={this.state.flow}
                onChange={this.onChangeFlow}
                name="flow"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Files</label>
              <input
                type="text"
                className="form-control"
                id="files"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="files"
              />
            </div>

            <button onClick={this.saveFlow} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
