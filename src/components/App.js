import React, { useState } from "react";
import AppRouter from "./Router";

function App() {
  const [isClass, setIsClass] = useState(true);
  return <>{isClass ? <AppRouter /> : "Not in classroom..."}</>;
}

export default App;
