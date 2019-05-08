import * as React from "react";
import { Form } from "./components/Form";
import { DataContainer } from "./components/DataContainer";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  withStyles,
  WithStyles
} from "@material-ui/core";

interface IState {
  parsedData: string[][] | Response;
  isLoading: boolean;
}

interface IProps extends WithStyles<typeof styles> {}

const styles = () => ({
  toolBar: {
    marginBottom: 60
  }
});

class Wrapper extends React.Component<IProps, IState> {
  state = {
    parsedData: [],
    isLoading: false
  };
  parseData = async (parseParams: any) => {
    try {
      this.setState({
        isLoading: true
      });
      const results = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parseParams)
      });
      results
        .json()
        .then(data => {
          console.log(data);
          this.setState({
            parsedData: data,
            isLoading: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <AppBar
          color="secondary"
          position="static"
          className={this.props.classes.toolBar}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Web-Scrapper
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Form parseData={this.parseData} />
          </Grid>
          <Grid item xs={6}>
            <DataContainer
              isLoading={this.state.isLoading}
              data={this.state.parsedData}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export const Main = withStyles(styles)(Wrapper);
