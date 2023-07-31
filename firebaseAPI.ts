import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React from "react";

type Order<T> = (arg1: T, arg2: T) => number;
type TransformForEach<T> = (value: T) => T;
type TransformFromFirestore<T> = (value: DocumentData) => T;

export type Doc<T> = {
  id: string,
  data: T
}
type SetCollection<T> = (value: React.SetStateAction<Doc<T>[]>) => void;

async function retrieveCollection<T>(collectionName: string, transform: TransformFromFirestore<T>) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const collData: Doc<T>[] = [];
  querySnapshot.forEach((doc) => { 
    collData.push({
      id: doc.id,
      data: transform(doc.data())
    });
  });
  return collData;
}

function getCachedCollection<T>(cacheName: string, transform: TransformForEach<T>) {
  const cachedData = localStorage.getItem(cacheName);
  if (cachedData) {
    const docs = JSON.parse(cachedData);
    docs.forEach((doc: Doc<T>) => {
      doc.data = transform(doc.data)
    });
    return docs;
  }
  return null;
}

async function fetchCollectionAndCache<T>(dataName: string, order: Order<T>, setCollection: SetCollection<T>, transform: TransformFromFirestore<T>) {
  retrieveCollection<T>(dataName, transform)
    .then((docs) => {
      docs.sort((a, b) => order(a.data, b.data));
      setCollection(docs);
      localStorage.setItem(dataName, JSON.stringify(docs));
    })
    .catch((error) => {
      console.error(error);
    })
}

export function setCollectionState<T>(dataName: string, order: Order<T>, setCollection: SetCollection<T>, transform: TransformForEach<T>, firestoreTransform: TransformFromFirestore<T>) {
  const cachedCollection = getCachedCollection<T>(dataName, transform);
  if (cachedCollection) {
    console.log(cachedCollection);
    setCollection(cachedCollection);
  } else {
    fetchCollectionAndCache<T>(dataName, order, setCollection, firestoreTransform)
      .catch((error) => {
        console.error(error.message);
      })
  }
}