import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { refCollection } from "../firebase/config";

const inputClasses = `
  border border-green-500 rounded-sm w-full py-2 px-3 block
`;

const INITIAL_STATE = {
  author: "",
  content: "",
  date: "",
};

// add tweets
const addDocToCollection = async (data) => {
  try {
    const docRef = await addDoc(refCollection, data);
  } catch (error) {
    console.error();
  }
};

const TweetForm = () => {
  const [tweet, setTweet] = useState(INITIAL_STATE);
  const handleChange = (event) => {
    const newTweet = {
      ...tweet,
      [event.target.name]: event.target.value,
    };

    setTweet(newTweet);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDocToCollection(tweet);
    setTweet(INITIAL_STATE);
  };

  return (
    <div>
      <h2>Tweets</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1">
        <div>
          <input
            className={`${inputClasses} h-10`}
            type="text"
            name="author"
            value={tweet.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            className={`${inputClasses} h-24 resize-none`}
            name="content"
            value={tweet.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            className={`${inputClasses} h-10`}
            type="date"
            name="date"
            value={tweet.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-sm"
            type="submit"
          >
            Send tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
