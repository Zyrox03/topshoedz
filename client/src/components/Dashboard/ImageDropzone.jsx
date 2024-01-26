import { useDropzone } from "react-dropzone";

// Dropzone component
const ImageDropzone = ({ onDrop, uploadedImages }) => {

      const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
      });
    
  
    return (
        <div className="w-[45%] bg-purple-500 shadow-lg  rounded-xl p-2">
        <div {...getRootProps()} className="border-dashed border-2 p-4 rounded-md cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-slate-100 text-center">Drag & drop or click to add images</p>
        </div>
        <div className="mt-4">
          {uploadedImages && uploadedImages.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index + 1}`} className="w-full mb-2 rounded-md" />
          ))}
        </div>
        </div>
    );
  };
  
  export default ImageDropzone
  // In your main component
  // Use <ImageDropzone /> component for each card
  