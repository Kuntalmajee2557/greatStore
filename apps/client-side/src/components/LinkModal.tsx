import React from "react";
import CancelIcon from "../Icons/Cancel";

interface ModalProps {
  linkModal: boolean;
  handleRemovePublicLink: () => void;
  toggleLinkModal: () => void;
  link: string;
}

function LinkModal({ linkModal, handleRemovePublicLink, toggleLinkModal, link }: ModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return linkModal ? (
    <div className="fixed h-full w-full bg-black/80 flex justify-center items-center">
      <div className="border border-stone-600 w-1/3 bg-black rounded-md p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl">Link</h2>
          <button
            className="text-white border border-stone-700 p-2 rounded-md hover:border-stone-300 hover:bg-stone-900"
            onClick={toggleLinkModal}
          >
            <CancelIcon className="size-6" />
          </button>
        </div>
        <div className="flex justify-between items-center p-2 border border-stone-600 rounded-md bg-black text-white">
          <span className="truncate">{link}</span>
          <button onClick={handleCopy} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
            Copy
          </button>
        </div>
        <button onClick={handleRemovePublicLink} className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Set Private</button>
      </div>
    </div>
  ) : null;
}

export default LinkModal;
