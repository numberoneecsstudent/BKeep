import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class NewEditor extends Component {
  render() {
    return (
      <CKEditor
        config={{
          removePlugins: [ 'Table, TableToolbar' ],
          toolbar: [ "heading", "|", 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'Image', 'ImageUpload' ]
        }}
        editor={ClassicEditor}
        placeholder="Hello!"
        onInit={editor => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          localStorage.setItem("data", editor.getData());
        }}
        onBlur={editor => {}}
        onFocus={editor => {}}
      />
    );
  }
}

export default NewEditor;
