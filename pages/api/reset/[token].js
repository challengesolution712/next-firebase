import { db, collection, getDocs, query, where, updateDoc, doc } from '../../../Firebase/firebase'
import TokenGenerator from 'uuid-token-generator'

export default (req, res) => {
    const { token, id } = req.query
    const { password } = req.body

    
    if (req.method == "GET") {
        const q = query(collection(db, 'users'), where('token', '==', token))
        getDocs(q).then(querySnapshot => {
            if (querySnapshot.empty) res.json({empty: true})
            else res.json({empty: false})
        })

    } else {
        
        const tokgen = new TokenGenerator(256, TokenGenerator.BASE62)
        const docRef = doc(db, "users", id)

        updateDoc(docRef, {
            password,
            token: tokgen.generate()
        }).then(() => {
            res.json({ updated: true, msg: {
                ar: "تم تغييير كلمة السر بنجاح",
                en: "Your password updated successfuly"
            }})
        })
    }
}