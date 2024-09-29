// components/CustomHook.js

import { useEffect, useState } from "react";

const useDocTitle = (initialTitle) => {
  const [doctitle, setDocTitle] = useState(initialTitle);

  useEffect(() => {
    document.title = doctitle;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export default useDocTitle; // Ensure this is a default export
