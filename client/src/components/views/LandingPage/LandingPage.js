import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((Response) => console.log(Response.data));
  }, []);

  return (
    <div>
      <h2>LandingPage</h2>
    </div>
  );
}

export default LandingPage;
