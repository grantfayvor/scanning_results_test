import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-error_marker";

export default ({ placeholder, name, value, onLoad, onChange }) => {
  return (
    <AceEditor
      placeholder={placeholder}
      mode="json"
      theme="solarized_dark"
      width="100%"
      height="400px"
      name={name}
      onLoad={onLoad}
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value || `{\n  \n}`}
      enableBasicAutocompletion={false}
      enableLiveAutocompletion={false}
      enableSnippets={false}
      showLineNumbers={true}
      tabSize={2} />
  )
}