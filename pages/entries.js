import React, { Component } from "react";
import entries from "./entries.json";
import Entry from "./accordion.js";

class Log extends Component {
  render() {
    var list = entries.map((entry, index) => {
      console.log("list:"+index+entry.author);
      return
        <Entry
          key={index}
          author={entry.author}
          session={entry.session}
          content={entry.content}
        />
    });
    console.log("list2:"+list);
    return list;
  }
}
export default Log;
