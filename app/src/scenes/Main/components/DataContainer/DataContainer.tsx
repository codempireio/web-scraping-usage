import * as React from "react";
import { Paper, withStyles, WithStyles } from "@material-ui/core";
import { ParsedData } from "./../../Main";

interface IContainerProps extends WithStyles<typeof styles> {
  data: {
    url: string;
    parsedData: ParsedData;
  } | null;
  isLoading: boolean;
}

const styles = () => ({
  paper: {
    minHeight: 300,
    width: "100%"
  }
});

class Container extends React.Component<IContainerProps> {
  render() {
    const {
      isLoading,
      data
    } = this.props;
    return (
      <div>
        <Paper className={this.props.classes.paper}>
          {isLoading && "Loading...."}
          {data ? (
            <div>
              <p>{data.url}</p>
              {data.parsedData.map((parsedItem: string[]) => {
                const [title, price] = parsedItem;
                return (
                  <div>
                    <p>{title}</p>
                    <p>{price}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export const DataContainer = withStyles(styles)(Container);
