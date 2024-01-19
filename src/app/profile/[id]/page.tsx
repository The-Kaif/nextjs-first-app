import React from "react";

function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>User Profile</h1>
      <p>
        params :{" "}
        <span className="bg-purple-700 text-yellow-200 p-1 m-1">
          {params.id}
        </span>{" "}
      </p>
    </div>
  );
}

export default UserProfile;
