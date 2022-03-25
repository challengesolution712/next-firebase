import { db, collection, getDocs } from '../../../Firebase/firebase'

export default (req, res) => {

    const { country, city, aid } = req.query

    getDocs(collection(db, "posts")).then(querySnapshot => {
        if (querySnapshot.empty) res.json({ posts: [] })
        else {
            
            const posts = []
            querySnapshot.docs.filter(docs => {
                if (
                    docs.data().country == country || 
                    docs.data().city == city ||
                    docs.data().aid == aid
                ) {
                    
                    posts.push({
                        id: docs.id,
                        ...docs.data()
                    })
                }
            })
            
            res.json({ posts })
        }
    })
}