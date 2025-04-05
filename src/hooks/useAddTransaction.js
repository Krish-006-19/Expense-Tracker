import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { database } from "../config/firebase-config"
import {useInfo} from './useInfo'
export let useAddTransaction = ()=>{
    let transcollection = collection(database,'transactions')
    let { userID } = useInfo()
    let addTransaction=async({description, transAmount, transType,})=>{
        await addDoc(transcollection,{
            userID,
            description,
            transAmount,
            transType,
            createdAt: serverTimestamp()
        })
    }
    return { addTransaction }
}
