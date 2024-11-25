import React from 'react';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="home-page">
      <h1>Welcome to FastFood!</h1>
      {user ? (
        <p>Hello, {user.username}. You are logged in.</p>
      ) : (
        <p>Please log in or register to start ordering.</p>
      )}
    </div>
  );
};

export default HomePage;
