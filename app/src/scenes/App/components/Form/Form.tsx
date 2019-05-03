import * as React from "react";

const DEFAULT_STATE = {
  url: "https://news.ycombinator.com",
  node: "a.storyLink"
};

interface IFormProps {
  url: string;
  node: string;
  [name: string]: string;
}

export class Form extends React.Component {
  state = DEFAULT_STATE;
  handleInput = (name: string) => (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    this.setState({
      [name]: e.currentTarget.value
    });
  };
  isUrl = (url: string) => {
    const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
    return reg.test(url);
  };
  parseData = async (e: React.FormEvent) => {
    e.preventDefault();
    const { url, node } = this.state;
    if (!this.isUrl(url) || !node.trim()) {
      return;
    }
    try {
      const results = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      });
      results
        .json()
        .then(data => console.log(data))
        .catch(err => {
          console.log(err);
        });

      this.setState({ ...DEFAULT_STATE, rawData: results });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.parseData}>
          <input value={this.state.url} onChange={this.handleInput("url")} />
          <input value={this.state.node} onChange={this.handleInput("node")} />
          <button type="submit">Parse</button>
        </form>
      </div>
    );
  }
}
