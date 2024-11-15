import React, { useEffect, useState } from "react";

const Portrait: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const fileUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(fileUrl);
        }
    };

    useEffect(() => {
        return () => {
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
        };
      }, [previewUrl]);

    const handleUpload = async () => {
        if(file){
            console.log("Uploading file...");
        
            const formData = new FormData();
            formData.append('file', file);

            try{
                const result = await fetch('',{
                    method: 'POST',
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
            } catch(error){
                console.error(error);
            }
        }
    };

    return(
        <>
        <div className="input-group">
            <input id="file" type="file" onChange={handleFileChange} />
        </div>
        {file && (
            <section>
            File details:
            <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
            </ul>
            
            </section>
        )}


        {previewUrl && (
            <div className="image-preview">
            <img src={previewUrl} alt="Portrait Preview" className="w-32 h-32 object-cover mt-4" />
            </div>
        )}

        {file && (
            <button 
            onClick={handleUpload}
            className="submit"
            >Upload a file</button>
        )}
        </>
    )
}

export default Portrait

function setPreviewUrl(fileUrl: string) {
    throw new Error("Function not implemented.");
}
