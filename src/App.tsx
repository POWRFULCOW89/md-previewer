import React from "react";
import { Component } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

marked.setOptions({
  breaks: true,
});

interface AppState {
  text: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      text: `
# This is the main title!
## Another subtitle!
You can go [anywhere](google.com)

\`function(){
  here is some code
}\`

And a code block!
\`\`\`
  <div></div>
\`\`\`

You can also use 
> block quotes!

- Some items

**Perhaps you need an image?**
![Image](https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/ikqra03zdnggljdu5vv0)
      `,
    };
  }

  update = () => {
    let preview = document.getElementById("preview");
    if (preview)
      preview.innerHTML = DOMPurify.sanitize(marked(this.state.text));
  };

  componentDidMount = () => {
    this.update();
  };

  handleChange = (e: { target: { value: any } }) => {
    this.setState({ text: e.target.value }, () => this.update());
  };

  render() {
    return (
      <div className="container-fluid row center m-2 w-75">
        <div className="col-12 row border shadow-lg rounded d-flex justify-content-around align-items-center p-4">
          <p className="col-12 text-center display-4">Markdown Previewer</p>
          <textarea
            id="editor"
            rows={10}
            className="col-12 form-control"
            value={this.state.text}
            onChange={this.handleChange}
          ></textarea>
          <div
            id="preview"
            className="col-12 border rounded mt-3 bg-light"
          ></div>
        </div>
        <div className="col-12 text-right small m-2">
          {"Made with <3 by POWRFULCOW89"}
        </div>
      </div>
    );
  }
}

export default App;
