import React, { useEffect, useState } from 'react';

export const App = () => {
  const [clientMessage, setClientMessage] = useState("");

  useEffect(() => {
    setClientMessage("Hello from React");
  })

  return (
    <>
      <h1>Hello World!</h1>
      <h2>{clientMessage}</h2>
    </>
  )
}