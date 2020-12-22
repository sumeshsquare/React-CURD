import React, { Component } from "react";
import FlowsDataService from "../services/flows.service";
import { Link } from "react-router-dom";

export default class FlowsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFlow = this.onChangeSearchFlow.bind(this);
    this.retrieveFlow = this.retrieveFlow.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFlow = this.setActiveFlow.bind(this);
    this.removeAllFlow = this.removeAllFlow.bind(this);
    this.searchFlow = this.searchFlow.bind(this);

    this.state = {
      flows: [],
      currentFlow: null,
      currentIndex: -1,
      searchFlow: ""
    };
  }

  componentDidMount() {
    this.retrieveFlow();
  }

  onChangeSearchFlow(e) {
    const searchFlow = e.target.value;

    this.setState({
      searchFlow: searchFlow
    });
  }

  retrieveFlow() {
    FlowsDataService.getAll()
      .then(response => {
        this.setState({
          flows: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFlow();
    this.setState({
      currentFlow: null,
      currentIndex: -1
    });
  }

  setActiveFlow(flow, index) {
    this.setState({
      currentFlow: flow,
      currentIndex: index
    });
  }

  removeAllFlow() {
    FlowsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchFlow() {
    this.setState({
      currentFlow: null,
      currentIndex: -1
    });

    FlowsDataService.findByFlow(this.state.searchFlow)
      .then(response => {
        this.setState({
          flows: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchFlow, flows, currentFlow, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by flow"
              value={searchFlow}
              onChange={this.onChangeSearchFlow}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFlow}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>File Mapper</h4>

          <ul className="list-group">
            {flows &&
              flows.map((data, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFlow(data, index)}
                  key={index}
                >
                  {data.flow}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFlow}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFlow ? (
            <div>
              <h4>Flow Details</h4>
              <div>
                <label>
                  <strong>Flow:</strong>
                </label>{" "}
                {currentFlow.flow}
              </div>
              <div>
                <label>
                  <strong>Files:</strong>
                </label>{" "}
                {currentFlow.files}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFlow.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/flows/" + currentFlow.flow}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}
