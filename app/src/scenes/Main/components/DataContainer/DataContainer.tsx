import * as React from "react";
import { Paper, withStyles, WithStyles } from "@material-ui/core";

interface IContainerProps extends WithStyles<typeof styles> {
  data: string[][];
  isLoading: boolean;
}

const styles = () => ({
  paper: {
    minHeight: 300,
    width: '100%'
  },
});

class Container extends React.Component<IContainerProps> {
  render() {
    return (
      <div>
        <Paper className={this.props.classes.paper}>
          {this.props.isLoading && "Loading...."}
          {this.props.data.length
            ? this.props.data.map(array => {
                return (
                  <div>
                    <p>{array[0]}</p>
                    <p>{array[1]}</p>
                  </div>
                );
              })
            : null}
        </Paper>
      </div>
    );
  }
}

export const DataContainer = withStyles(styles)(Container);