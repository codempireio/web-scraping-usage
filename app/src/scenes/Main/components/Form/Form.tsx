import * as React from "react";
import { TextField, Button } from "@material-ui/core";

const DEFAULT_STATE = {
  url: "https://rozetka.com.ua",
  firstNode: "a.main-goods__title",
  param1: "span.detail-price-uah",
  param2: "h1[itemprop=name]"
};

interface IFormProps {
  parseData(parseParams: any): Promise<any>;
}

export class Form extends React.Component<IFormProps> {
  state = DEFAULT_STATE;
  handleInput = (name: string) => (e: any) => {
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
    const { url, firstNode, param1, param2 } = this.state;
    if (!this.isUrl(url) || !firstNode.trim()) {
      return;
    }
    try {
      const parseParams = {
        url,
        firstNode,
        properties: [param1, param2]
      };
      await this.props.parseData(parseParams);
      this.setState(DEFAULT_STATE);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.parseData}>
          <TextField
            value={this.state.url}
            onChange={this.handleInput("url")}
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Enter url"
            helperText="Url of the page you want to parse"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            value={this.state.firstNode}
            onChange={this.handleInput("firstNode")}
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Item Link"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            value={this.state.param1}
            onChange={this.handleInput("param1")}
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Title"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            value={this.state.param2}
            onChange={this.handleInput("param2")}
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Price"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Parse
          </Button>
        </form>
      </div>
    );
  }
}
