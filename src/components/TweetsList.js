import React, { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db, refCollection } from "../firebase/config";

const updateDocument = async (id, data) => {
  const tweetDocument = doc(db, "tweets", id);
  await setDoc(tweetDocument, data);
};

const TweetsList = () => {
  const [tweetsDocs, setTweetDocs] = useState([]);
  const [tweetsSnapshot, setTweetsSnapshot] = useState([]);

  useEffect(() => {
    const tweetsCollection = collection(db, "tweets");

    getDocs(tweetsCollection).then((data) => {
      setTweetDocs(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          isEditing: false,
        }))
      );
    });
  }, []);

  useEffect(() => {
    const tweetsCollection = collection(db, "tweets");

    const unsubscribe = onSnapshot(tweetsCollection, (snapshot) => {
      setTweetsSnapshot(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          isEditing: false,
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEdit = (index) => {
    const newTweets = tweetsSnapshot.map((tweet, i) => ({
      ...tweet,
      isEditing: index === i,
    }));

    setTweetsSnapshot(newTweets);
  };

  const handleChange = (event, index) => {
    const newTweets = tweetsSnapshot.map((tweet, i) =>
      index === i
        ? {
            ...tweet,
            [event.target.name]: event.target.value,
          }
        : tweet
    );

    setTweetsSnapshot(newTweets);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const tweet = tweetsSnapshot.find((tweet) => tweet.isEditing);

    updateDocument(tweet.id, {
      author: tweet.author,
      content: tweet.content,
      date: tweet.date,
    });
  };

  return (
    <div>
      <h2>TweetsList</h2>
      <div className="">
        {/* <ul className="grid gap-4 grip-cols-1">
          {
            tweetsDocs.map((tweet, index) => (
              <li className="border border-green-500 bg-green-50 px-4 py-2 rounded-md text-green-500" key={tweet.content}>
                <h3>Author: {tweet.author}</h3>
                <p>
                  content: {tweet.content}
                </p>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </li>
            ))
          }
        </ul> */}

        <ul className="grid gap-4 grip-cols-1">
          {tweetsSnapshot.map((tweet, index) => (
            <li
              className="border border-blue-500 bg-blue-50 px-4 py-2 rounded-md text-blue-500"
              key={tweet.id}
            >
              {tweet.isEditing ? (
                <form onSubmit={handleSubmit} className="grid gap-2">
                  <input
                    type="text"
                    name="author"
                    value={tweet.author}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <textarea
                    name="content"
                    value={tweet.content}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <button className="bg-blue-500 text-white" type="submit">
                    Update
                  </button>
                </form>
              ) : (
                <>
                  <h3>Author: {tweet.author}</h3>
                  <p>Content: {tweet.content}</p>
                  <p>Date: {tweet.date}</p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TweetsList;
