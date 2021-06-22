import React, { Component } from 'react';

class FileUploadForm extends Component
{
  render()
   {
      return(
        <form>
          <h1>File Upload</h1>
          <input type="file" name="file"/>
          <button type="submit">Upload</button>
        </form>
      )
   }
}
export default FileUploadForm;