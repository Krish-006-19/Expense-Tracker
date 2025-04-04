import { query, where, collection, orderBy, onSnapshot} from "firebase/firestore"
import { useEffect, useState } from "react"
import { database } from "../config/firebase-config"
import { useInfo } from "./useInfo"

export let useGetTransaction =()=>{
    let transcollection = collection(database,'transactions')
    let [transaction, setTransaction] = useState([])
    let {userID} = useInfo()
    useEffect(()=>{
            let queryTransactions = query(transcollection,
               where('userID','==',userID),
               orderBy("createdAt")
           )
           let unsubscribe = onSnapshot(queryTransactions,snapshot=>{
               let docs = []
               snapshot.forEach(doc=>{
                   let data = doc.data()
                   let id = doc.id
                   docs.push({...data,id})
               })
           setTransaction(docs)
            })
       return ()=>unsubscribe()
    },[userID])
    return {transaction}
}