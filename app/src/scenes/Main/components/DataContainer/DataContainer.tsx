import * as React from "react";
import { Paper, withStyles, WithStyles } from "@material-ui/core";
import { ServerResponse } from "../../../../services/parsing-service";

interface IContainerProps extends WithStyles<typeof styles> {
  data: ServerResponse | null;
  isLoading: boolean;
  isError: boolean;
}

const styles = () => ({
  paper: {
    minHeight: 300,
    width: "100%"
  }
});

const Container = (props: IContainerProps) => {
  const { isLoading, data, isError } = props;

  const renderServerResponse = () => {
    if (!data) {
      return null;
    }
    return data.parsedData.map((parsedItem: string[]) => {
      const [title, price] = parsedItem;
      return (
        <div>
          <p>{title}</p>
          <p>{price}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <Paper className={props.classes.paper}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Ups. Something went wrong. Check your inputs</p>}
        {renderServerResponse()}
      </Paper>
    </div>
  );
};

export const DataContainer = withStyles(styles)(Container);
