import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { ParseParams } from "../../../../services/parsing-service";

const DEFAULT_STATE: IFormState = {
  url: "https://rozetka.com.ua",
  firstNode: "a.main-goods__title",
  param1: "span.detail-price-uah",
  param2: "h1[itemprop=name]",
  nextPageBtn: "",
  pageAmount: 2
};

const inputs = [
  {
    type: "text",
    label: "Enter URL",
    role: "url"
  },
  {
    type: "text",
    label: "Enter Item Link",
    role: "firstNode"
  },
  {
    type: "text",
    label: "Enter Item Title",
    role: "param1"
  },
  {
    type: "text",
    label: "Enter Item Price",
    role: "param2"
  },
  {
    type: "text",
    label: "Enter next page button",
    role: "nextPageBtn"
  },
  {
    type: "number",
    label: "Enter number of pages you want to parse",
    role: "pageAmount"
  }
];

interface IFormProps {
  parseData(parseParams: ParseParams): Promise<any>;
}

interface IFormState {
  [key: string]: string | number;
  url: string;
  firstNode: string;
  param1: string;
  param2: string;
  nextPageBtn: string;
  pageAmount: number;
}

export class Form extends React.Component<IFormProps, IFormState> {
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
    const {
      url,
      firstNode,
      param1,
      param2,
      nextPageBtn,
      pageAmount
    } = this.state;
    if (!this.isUrl(url) || !firstNode.trim()) {
      return;
    }
    try {
      const parseParams = {
        url,
        firstNode,
        properties: [param1, param2],
        nextPageBtn,
        pageAmount
      };
      await this.props.parseData(parseParams);
      this.setState(DEFAULT_STATE);
    } catch (err) {
      console.log(err);
    }
  };

  renderInputs = () => {
    return inputs.map((inputEl, id) => {
      return (
        <TextField
          key={id}
          value={this.state[inputEl.role]}
          onChange={this.handleInput(inputEl.role)}
          id="standard-full-width"
          label={inputEl.label}
          style={{ margin: 8 }}
          type={inputEl.type}
          placeholder={inputEl.label}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.parseData}>
          {this.renderInputs()}
          <Button type="submit" variant="contained" color="secondary">
            Parse
          </Button>
        </form>
      </div>
    );
  }
}
