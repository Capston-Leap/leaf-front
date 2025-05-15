import { useState } from "react";

export const useHandleModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);

  return { open, handleOpen };
};
