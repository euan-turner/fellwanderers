import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React from "react";

async function retrieveAllData<T>(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const res: T[] = [];
  querySnapshot.forEach((item) => {
    res.push(item.data() as T)
  });
  return res;
}

function getCachedData(cacheName: string) {
  const cachedData = localStorage.getItem(cacheName);
  if (cachedData) {
    const data = JSON.parse(cachedData);
    return data;
  }
  return null;
}

type Order<T> = (arg1: T, arg2: T) => number;
type StateSetter<T> = (value: React.SetStateAction<T[]>) => void;

async function fetchDataAndCache<T>(dataName: string, order: Order<T>, setData: StateSetter<T>) {
  retrieveAllData<T>(dataName)
    .then((data) => {
      data.sort(order);
      setData(data);
      localStorage.setItem(dataName, JSON.stringify(data));
    })
    .catch((error) => {
      console.error(error);
    })
}

export function setStateData<T>(dataName: string, order: Order<T>, setData: StateSetter<T>) {
  const cachedData = getCachedData(dataName);
  if (cachedData) {
    setData(cachedData);
  } else {
    fetchDataAndCache<T>(dataName, order, setData)
      .catch((error) => {
        console.error("Error fetching ".concat(dataName).concat(": "), error);
      })
  }
}