// import React, { useContext, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { ProfileCreateContext, useProfileContext } from "../../../components/context/createProfileContext";
// import "./forms.css";

// const UploadMediaForm = () => {
//     const { state, dispatch } = useProfileContext()
//     const { mediaFiles } = state;

//     const onDrop = (acceptedFiles) => {
//         dispatch({ type: "ADD_MEDIA_FILES", payload: acceptedFiles });
//     };

//     const handleRemoveFile = (index) => {
//         dispatch({ type: "REMOVE_MEDIA_FILE", payload: index });
//     };

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop,
//         accept: "image/*,video/*",
//         multiple: true,
//     });

//     return (
//         <div className="uploadMediaForm">
//             <h2 style={{ fontSize: "22px" }}>Upload Media</h2>
//             <div {...getRootProps({ className: "dropzone" })}>
//                 <input {...getInputProps()} />
//                 <p className="media-guide">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-upload"
//                     >
//                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v14M19 8l-7-7-7 7M17 9.5h-4v5h-2v-5H7"></path>
//                     </svg>
//                     Upload Media
//                 </p>
//             </div>
//             <div className="mediaPreview">
//                 {mediaFiles?.map((file, index) => {
//                     // Extract the file extension from the URL
//                     const fileExtension = file?.split('.')?.pop()?.toLowerCase();

//                     return (
//                         <div className="mediaContainer" key={index}>
//                             {['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension) ? (
//                                 <img src={file} alt={`media-${index}`} className="mediaFile" />
//                             ) : (
//                                 <video src={file} controls className="mediaFile"></video>
//                             )}
//                             <div className="removeMediaButton" onClick={() => handleRemoveFile(index)}>
//                                 &times;
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default UploadMediaForm;
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";

const UploadMediaForm = () => {
    const { state, dispatch } = useProfileContext();
    const { mediaFiles = [] } = state; // Default to an empty array if mediaFiles is undefined

    const onDrop = (acceptedFiles) => {
        // Filter out only image files
        const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
        
        // Map to include preview URLs
        const newFiles = imageFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        dispatch({ type: "ADD_MEDIA_FILES", payload: newFiles });
    };

    const handleRemoveFile = (index) => {
        dispatch({ type: "REMOVE_MEDIA_FILE", payload: index });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });

    useEffect(() => {
        // Clean up the URL.createObjectURL
        return () => {
            mediaFiles.forEach(mediaFile => {
                if (mediaFile && mediaFile.preview) {
                    URL.revokeObjectURL(mediaFile.preview);
                }
            });
        };
    }, [mediaFiles]);

    return (
        <div className="uploadMediaForm">
            <h2 style={{ fontSize: "22px" }}>Upload Media</h2>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="media-guide">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-upload"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v14M19 8l-7-7-7 7M17 9.5h-4v5h-2v-5H7"></path>
                    </svg>
                    Upload Media
                </p>
            </div>
            <div className="mediaPreview">
                {mediaFiles.map((media, index) => {
                    // Check if media is a file object with a preview URL
                    const isFileObject = media && media.file && media.preview;

                    // Determine URL and file extension
                    const url = isFileObject ? media.preview : media;
                    const fileExtension = isFileObject ? media.file.name.split('.').pop().toLowerCase() : url.split('.').pop().toLowerCase();

                    // Render only images
                    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                        return (
                            <div className="mediaContainer" key={index}>
                                <img src={url} alt={`media-${index}`} className="mediaFile" />
                                <div className="removeMediaButton" onClick={() => handleRemoveFile(index)}>
                                    &times;
                                </div>
                            </div>
                        );
                    } else {
                        return null; // Ignore non-image files
                    }
                })}
            </div>
        </div>
    );
};

export default UploadMediaForm;
