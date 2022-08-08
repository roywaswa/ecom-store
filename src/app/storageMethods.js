import { storage } from "./firebase";
import {useState, useEffect} from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export  function useStorage(file) {
  const [progress, setProgress] = useState()
  const [error, setError] = useState()
  const [url, setUrl] = useState()

  useEffect(() => {
    if (!file) {
      return setError('No file selected')
    } else {
      setError(null)
    }

    const storageRef = ref(storage, file.name)
    const task = uploadBytesResumable(storageRef, file)

    task.on('state_changed', snapshot => { 
      const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      
      setProgress(percentage)
    }, error => { 
      setError(error)
    }, () => {
      getDownloadURL(task.snapshot.ref).then(url => {
        setUrl(url)
      })
    })
  }, [file])
  return {progress, error, url}
}




