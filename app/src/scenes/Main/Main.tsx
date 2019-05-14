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
import {
  ParseParams,
  parsingService,
  ServerResponse
} from "../../services/parsing-service";

interface IState {
  parsedData: ServerResponse | null;
  isLoading: boolean;
  isError: boolean;
}

interface IProps extends WithStyles<typeof styles> {}

const styles = () => ({
  toolBar: {
    marginBottom: 60
  }
});

class Wrapper extends React.Component<IProps, IState> {
  state = {
    parsedData: null,
    isLoading: false,
    isError: false
  };
  parseData = async (parseParams: ParseParams) => {
    this.setState({
      isLoading: true
    });
    const data = await parsingService.parseData(parseParams);

    if (!data) {
      this.setState({
        isError: true,
        isLoading: false
      });
      return;
    }

    this.setState({
      parsedData: data,
      isLoading: false
    });
  };

  render() {
    const { isLoading, isError, parsedData } = this.state;
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
              isLoading={isLoading}
              data={parsedData}
              isError={isError}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export const Main = withStyles(styles)(Wrapper);
