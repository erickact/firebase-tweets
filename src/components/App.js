import React from "react";
import TweetForm from "./TweetForm";
import TweetsList from "./TweetsList";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-lg">
        <h1>Hi!</h1>
        <TweetForm />
        <TweetsList />
      </div>
    </div>
  );
}

export default App;
