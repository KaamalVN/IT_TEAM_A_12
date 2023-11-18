import React, { Component } from 'react';
import './Bulkupload.css';
import BulkUploadImage from './BulkUploadImage.jpeg';
import axios from 'axios';
export default class Bulkupload extends Component {
    state = {
        file: null,
        response: null,
    };

    handleFileUpload = (e) => {
        const file = e.target.files[0];
        this.setState({ file });
    };

    handleUpload = async () => {
      const { file } = this.state;
  
      if (!file) {
          alert('Please select a file to upload.');
          return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
          const response = await axios.post('http://localhost:5000/upload', formData);
  
          if (response){
              alert('Employees added successfully');
          } else {
              alert('Error Occurred. Please try again.');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred during the file upload.');
      }
  };

    render() {
        const { response } = this.state;

        return (
            <div id="bulkContainer" className="container-fluid">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div id="roleContainers" className="p-3 custom-border">
                        <p id="roletext">Upload Folder</p>
                        <p id='text'><strong>*The file should be in the below format*</strong></p>
                        <div>
                            <img src={BulkUploadImage} alt="My Image" />
                        </div>
                        <br></br>
                        <div>
                            <input style={{ color: '#FFD300', marginRight: '16%' }} type="file" onChange={this.handleFileUpload} />
                        </div>
                        <button style={{ marginRight: '-20%', marginTop: '4%' }} className="btn" id="admincombtn" onClick={this.handleUpload}>Upload</button>
                    </div>
                    {response && (
                        <div>
                            <p>Server Response:</p>
                            <pre>{JSON.stringify(response, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}