import { useDropzone } from "react-dropzone";
import PropTypes from 'prop-types'
// Dropzone component
const ImageDropzone = ({ onDrop, uploadedImages, loading }) => {

      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        disabled: loading
      });
    
  
    return (
        <div className="w-full bg-purple-500 shadow-lg  rounded-xl p-2">
        <div {...getRootProps()} className="border-dashed border-2 p-4 rounded-md cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-slate-100 text-center">Drag & drop or click to add images</p>
        </div>
        <div className="mt-4">
          {uploadedImages && uploadedImages.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index + 1}`} className="w-full mb-2  max-h-40 lg:max-h-60 rounded-md h-full object-cover" />
          ))}
        </div>
        </div>
    );
  };
  
  export default ImageDropzone
  // In your main component
  // Use <ImageDropzone /> component for each card
  
  ImageDropzone.propTypes = {
    onDrop : PropTypes.func,
    uploadedImages: PropTypes.array,
    loading: PropTypes.bool
  }