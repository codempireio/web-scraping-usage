export interface ParseParams {
  url: string;
  firstNode: string;
  properties: string[];
  nextPageBtn: string;
  pageAmount: number;
}

type ParsedData = string[][];

export interface ServerResponse {
  url: string;
  parsedData: ParsedData;
}

class ParsingService {
  public parseData = async (parseParams: ParseParams): Promise<ServerResponse | void> => {
    try {
      const results = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parseParams)
      });
      const data = await results.json();
      return data;
    } catch (err) {
      console.warn(err);
    }
  };
}

export const parsingService = new ParsingService();
