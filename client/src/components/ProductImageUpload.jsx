import { Image, Trash2 } from 'lucide-react'
import { useState, useRef } from 'react' // Import useRef
import FileResizer from 'react-image-file-resizer'
import { Button } from './ui/button'

export const ImageUpload = ({ image, setImage, setOriginalFilename }) => {
  const [imagePreview, setImagePreview] = useState(null)
  const inputRef = useRef(null) // Create a ref for the input element

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    setOriginalFilename(file.name)

    // Resize and compress the image
    FileResizer.imageFileResizer(
      file,
      400, // maxWidth
      400, // maxHeight
      'JPEG', // compressFormat
      70, // quality
      0, // rotation
      (blob) => {
        setImagePreview(URL.createObjectURL(blob))
        setImage(blob)
      },
      'blob' // outputType
    )
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)
    setOriginalFilename(null)
    inputRef.current.value = '' // Clear the input value to allow re-uploading the same file
  }

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4">
      <label
        htmlFor="image"
        className="flex justify-center w-full h-full cursor-pointer"
      >
        {image ? (
          <img
            src={imagePreview}
            alt="Product"
            className="border w-auto max-h-[22rem] rounded-lg"
          />
        ) : (
          // <div className="flex flex-col w-full max-h-[26rem] items-center justify-center border shadow-sm dark:shadow-gray-600  p-4 bg-gray-100 dark:bg-slate-950 rounded-lg">
          //   <Image className="w-12 h-12 mt-2 text-gray-600" />
          //   Click to upload image
          // </div>

          <div className="flex items-center justify-center w-full">
            <div
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-full   border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center">
                <Image className="w-12 h-12 mt-2 text-gray-600" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JPEG, JPG, PNG or GIF
                </p>
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef} // Set the ref for the input element
                key={image ? 'hasImage' : 'noImage'} // Set a key based on whether there is an image
                className="sr-only"
              />
            </div>
          </div>
        )}
      </label>
      {image && (
        <Button
          onClick={handleRemoveImage}
          className="flex bg-red-500 text-white hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Remove
        </Button>
      )}
    </div>
  )
}
