import { useState } from "react";

function usePostRequest() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const postRequest = (url, data, token = null, onSuccess) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        onSuccess(responseData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error: ", err);
        setMessage(err.message);
        setLoading(false);
      });
  };

  return { postRequest, message, loading };
}

export default usePostRequest;
