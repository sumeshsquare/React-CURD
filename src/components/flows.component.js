import React, { Component } from "react";
import FlowsDataService from "../services/flows.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeFlow = this.onChangeFlow.bind(this);
    this.onChangeFiles = this.onChangeFiles.bind(this);
    this.getFlow = this.getFlow.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateFlow = this.updateFlow.bind(this);
    this.deleteFlow = this.deleteFlow.bind(this);

    this.state = {
      currentFlow: {
        id: null,
        flow: "",
        files: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFlow(this.props.match.params.id);
  }

  onChangeFlow(e) {
    const flow = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFlow: {
          ...prevState.currentFlow,
          flow: flow
        }
      };
    });
  }

  onChangeFiles(e) {
    const files = e.target.value;
    
    this.setState(prevState => ({
      currentFlow: {
        ...prevState.currentFlow,
        files: files
      }
    }));
  }

  getFlow(id) {
    FlowsDataService.get(id)
      .then(response => {
        this.setState({
          currentFlow: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentFlow.id,
      flow: this.state.currentFlow.flow,
      files: this.state.currentFlow.files,
      published: status
    };

    FlowsDataService.update(this.state.currentFlow.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFlow: {
            ...prevState.currentFlow,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFlow() {
    FlowsDataService.update(
      this.state.currentFlow.id,
      this.state.currentFlow
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Flow was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFlow() {    
    FlowsDataService.delete(this.state.currentFlow.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/flows')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFlow } = this.state;

    return (
      <div>
        {currentFlow ? (
          <div className="edit-form">
            <h4>Flow Details</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Flow</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentFlow.flow}
                  onChange={this.onChangeFlow}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Files</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFlow.files}
                  onChange={this.onChangeFiles}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFlow.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentFlow.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
