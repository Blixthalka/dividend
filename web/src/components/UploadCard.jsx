import React from 'react';
import Card from '../components/Card';

const UploadCard = () => {


    return (
        <Card title="Upload Transaction File" >
            <label className="mt-5 border rounded border-dashed  p-10 relative flex justify-center">
                <input id="upload-file" type="file" onChange={(event) => {
                    console.log(event.target.value)
                    console.log("HELLO")
                    event.target.value = null
                }} />
                <p className="text-sm text-primary">Drag and drop, or browse here</p>
            </label>
        </Card>
    );
}

export default UploadCard;
