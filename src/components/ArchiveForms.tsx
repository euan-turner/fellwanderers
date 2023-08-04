import React, { useState } from 'react';
import Archive from "../types/Archive";
import { Doc } from "../../firebaseAPI";
import { storage } from "../../firebase";
import { uploadBytes, ref } from "firebase/storage";

type SetArchiveDocState = React.Dispatch<React.SetStateAction<Doc<Archive>[]>>;
type AddArchiveFormSubmit = (archive: Archive, archiveDocs: Doc<Archive>[], setState: SetArchiveDocState) => void;
interface AddArchiveFormProps {
  onSubmit: AddArchiveFormSubmit;
  isValidAdd: (archive: Archive) => [boolean, string | null];
  archiveDocs: Doc<Archive>[];
  setState: SetArchiveDocState;
}

export function AddArchiveForm({ onSubmit, isValidAdd, archiveDocs, setState}: AddArchiveFormProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [order, setOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const folderName = () => 'images/archive/${title}';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = () => {
    if (selectedFiles) {
      
      const storageRef = ref(storage, folderName());

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const childRef = ref(storageRef, '${file.name}');
        uploadBytes(childRef, file)
          .catch((error) => {
            console.error('Error uploading file:', error);
          }
        );
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const archive: Archive = {
      title, desc, directory: folderName(), textLeft: order % 2 == 0, order
    };

    const [isValid, err] = isValidAdd(archive);
    setError(err);
    if (isValid) {
      // wrap handleUpload inside onSubmit, or use here
      // really need to do it in the firebaseAPI
      // handleUpload();
      onSubmit(archive, archiveDocs, setState);
      setOrder(0);
      setTitle('');
      setDesc('');
      setSelectedFiles(null);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div className={"text-red-500"}>{error}</div>}
        <div>
          <label className={"block mb-2"}>
            {"Title: "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className={"flex items-start mb-2"}>
            {"Description: "}
            <textarea
              className={"w-full mx-2"}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className={"block mb-2"}>
            {"Images: "}
            <input 
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div>
          <label className={"block mb-2"}>
            {"Order: "}
            <input
              type="number"
              min="1"
              max={archiveDocs.length + 1}
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              required
            />
          </label>
        </div>
      </form>
    </div>
  )
}