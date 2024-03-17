import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import Post from "./Post";
import TweetForm from "./TweetForm";
import { auth, db } from "../firebase/firebaseConfig";

const Main = () => {
  // koleksiyonun referansını alma
  const [tweets, setTweets] = useState(null);

  const ref = collection(db, "twets");
  useEffect(() => {
    const queryFilter = query(ref, orderBy("createdAt", "desc"));
    onSnapshot(queryFilter, (snapshot) => {
      const liveTwets = [];
      // dokümanların verilerine erişip dşziye aktarma
      snapshot.forEach((doc) =>
        liveTwets.push({ ...doc.data(), id: doc.id })
      );
      setTweets(liveTwets);
    });
  }, []);
  return (
    <main className="max-w-[600px] col-span-4 md:col-span-3 border border-gray-800">
      <header className="font-bold p-4 border-b-2 border-[#4746466f]">
        AnaSayfa
      </header>
      <TweetForm />

      {/* loading  */}
      {!tweets && (
        <p className="text-center mt-[200px]"> Yükleniyor....</p>
      )}

      {/* atılan tweetlerin listlendiği alan */}
      {tweets?.map((tweet) => (
        <Post tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;
