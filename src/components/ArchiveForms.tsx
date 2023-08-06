import React, { useState } from 'react';
import Archive from "../types/Archive";
import { Doc } from "../../firebaseAPI";


type SetArchiveDocState = React.Dispatch<React.SetStateAction<Doc<Archive>[]>>;
type AddArchiveFormSubmit = (archive: Archive, images: FileList, archiveDocs: Doc<Archive>[], setState: SetArchiveDocState) => void;
interface AddArchiveFormProps {
  onSubmit: AddArchiveFormSubmit;
  isValidAdd: (archive: Archive, selectedList: FileList | null) => [boolean, string | null];
  archiveDocs: Doc<Archive>[];
  setState: SetArchiveDocState;
}

// TODO: Support multiple images
export function AddArchiveForm({ onSubmit, isValidAdd, archiveDocs, setState}: AddArchiveFormProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [order, setOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const folderName = () => `images/archive/${title}`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const archive: Archive = {
      title, desc, directory: folderName(), order
    };
    console.log(archive);

    const [isValid, err] = isValidAdd(archive, selectedFiles);
    setError(err);
    if (isValid) {
      onSubmit(archive, selectedFiles as FileList, archiveDocs, setState);
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
          { /* Display the selected files */ }
          { selectedFiles && selectedFiles.length > 0 && (
            <div>
              <h3>Selected Files:</h3>
              <ul>
                {
                  Array.from(selectedFiles).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))
                }
              </ul>  
            </div>
          )}
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
        <button type="submit" className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}>Submit</button>
      </form>
    </div>
  )
}

type EditArchiveFormSubmit = (newArchive: Archive, oldOrder: number, archiveDocs: Doc<Archive>[], setState: SetArchiveDocState) => void;
interface EditArchiveFormProps {
  onSubmit: EditArchiveFormSubmit;
  isValidEdit: (newArchive: Archive, order: number, archiveDocs: Doc<Archive>[]) => [boolean, string | null];
  archiveDocs: Doc<Archive>[];
  setState: SetArchiveDocState;
}

export function EditArchiveForm({ onSubmit, isValidEdit, archiveDocs, setState}: EditArchiveFormProps) {
  const [order, setOrder] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [oldTitle, setOldTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  // Work out how to edit images, will likely need to save as we go

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const oldArchive = archiveDocs.filter((doc) => {return doc.data.title === oldTitle})[0];
    const newArchive: Archive= {
      title: newTitle, desc, order, directory: oldArchive.data.directory
    }
    const [isValid, err] = isValidEdit(newArchive, order, archiveDocs);
    setError(err);
    if (isValid) {
      onSubmit(newArchive, oldArchive.data.order, archiveDocs, setState);
      setOrder(0);
      setNewTitle('');
      setOldTitle('');
      setDesc('');
    }
  }

  const handleTitleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOldTitle(e.target.value);
  }
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(parseInt(e.target.value, 10));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div className={"text-red-500"}>{error}</div>}
        <div>
          <label htmlFor={"dropdown"} className={"block mb-2"}>
            {"Select Archive: "}
          </label>
          <select id={"dropdown"} value={oldTitle || ''} onChange={handleTitleOptionChange}>
            <option value=""> -- Select -- </option>
            {archiveDocs.map((archiveDoc, index) => (
              <option  key={index} value={archiveDoc.data.title}>
                {archiveDoc.data.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={"block mb-2"}>
            {"New Title: "}
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
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
        <label htmlFor={"dropdown"}  className={"block mb-2"}>
          {"Order: "}
        </label>
        <select id={"dropdown"} value={order || ''} onChange={handleOrderChange}>
          <option value=""> -- Select -- </option>
          {archiveDocs.map((archiveDoc, index) => (
              <option key={index} value={archiveDoc.data.order}>
                {archiveDoc.data.order}
              </option>
          ))
          }
        </select>
      </div>
      <button type="submit" className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}>Submit</button>
      </form>
    </div>
  )
}

type DeleteArchiveFormSubmit = (title: string, archiveDocs: Doc<Archive>[], setState: SetArchiveDocState) => void;
interface DeleteArchiveFormProps {
  onSubmit: DeleteArchiveFormSubmit;
  isValidDelete: (title: string, archiveDocs: Doc<Archive>[]) => [boolean, string | null];
  archiveDocs: Doc<Archive>[];
  setState: SetArchiveDocState;
}

export function DeleteArchiveForm({ onSubmit, isValidDelete, archiveDocs, setState}: DeleteArchiveFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [isValid, err] = isValidDelete(title, archiveDocs);
    setError(err);
    if (isValid) {
      onSubmit(title, archiveDocs, setState);
      setTitle('');
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(e.target.value);
  }

  return (
    <div className={"p-2"}>
      <form onSubmit={handleSubmit}>
      {error && <div className={"text-red-500"}>{error}</div>}
      <div>
        <label htmlFor={"dropdown"}  className={"block mb-2"}>
          {"Select Hike: "}
        </label>
        <select id={"dropdown"} value={title || ''} onChange={handleTitleChange}>
          <option value=""> -- Select -- </option>
          {archiveDocs.map((archiveDoc, index) => (
              <option key={index} value={archiveDoc.data.title}>
                {archiveDoc.data.title}
              </option>
          ))
          }
        </select>
      </div>
      <button type="submit" className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}>Submit</button>
    </form>
  </div>
  )
}