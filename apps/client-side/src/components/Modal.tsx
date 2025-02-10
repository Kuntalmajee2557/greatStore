import React, { useEffect, useState } from "react";
import CancelIcon from "../Icons/Cancel";
import { useForm } from "react-hook-form"
import { DefaultValue, useRecoilValue } from "recoil";
import axios from "axios";
import { tokenAtom } from "../store/atom/token";

interface modalProps {
  modal: boolean;
  toggleModal: () => void;
  token: string
}

interface IFormInput {
  title: string;
  link: string;
  type: "ARTICLE" | "VIDEO" | "IMAGE" | "AUDIO";
  tags?: string[];
}

function Modal({ modal, toggleModal, token }: modalProps) {
  // const token: string = useRecoilValue(tokenAtom)
  const [formData, setFormData] = useState({
    tags: [] as string[],
  });
  const [notification, setNotification] = useState<string | null>(null);
  const [error, setError] = useState<any>('');
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<IFormInput>({ defaultValues: { tags: [] } });

  const tags = watch("tags") || []

  const [tagInput, setTagInput] = useState("");

  //hardcode all tags
  const allTags = [
    "React",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Node.js",
    "API",
    "Frontend",
    "Backend",
  ];

  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);

    // Show suggestions only when there is input
    if (value.trim()) {
      const filteredTags = allTags.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedTags(filteredTags);
    } else {
      setSuggestedTags([]);
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setValue("tags", [...(tags || []), tag]);
    }
    setTagInput("");
    setSuggestedTags([]);
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
    setValue("tags", tags.filter((t) => t !== tag))
  };

  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
  };

  const handleCreateContent = (formData: IFormInput) => {
    // alert(JSON.stringify(formData))
    console.log(token)
    console.log("Form Data:", formData);
    axios({
      url:`${import.meta.env.BACKEND_URL}/api/v1/content`,
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }  
    }).then((res) => {
      if(res.status === 2000)
      setNotification("Form submitted successfully!");
      toggleModal()
    })

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);

  };

  return modal ? (
    <div className="fixed h-full w-full bg-black/80 flex justify-center items-center">
      <div className="border border-stone-600 w-1/3 bg-black rounded-md p-7 flex flex-col">
        <div className="pb-5 flex justify-between">
          <h2 className="text-white text-2xl">Add New Content</h2>
          <button
            className="text-white border border-stone-700 p-2 rounded-md hover:border-stone-300 hover:bg-stone-900"
            onClick={toggleModal}
          >
            <CancelIcon className="size-6" />
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateContent)}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-white mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="p-2 border border-stone-600 rounded-md bg-black text-white"
              placeholder="Enter title"
              {...register("title", {
                required: "Title is mandatory"
              })}
            />
            {errors.title && (
              <span className="text-red-500 text-md mt-1">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="link" className="text-white mb-2">
              Link
            </label>
            <input
              type="text"
              id="link"
              className="p-2 border border-stone-600 rounded-md bg-black text-white"
              placeholder="Enter link"
              {...register("link", {
                required: "Link is mandatory"
              })}
            />
            {errors.link && (
              <span className="text-red-500 text-md mt-1">{errors.link.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="text-white mb-2">
              Type
            </label>
            <select
              id="type"
              className="p-2 border border-stone-600 rounded-md bg-black text-white"
              {...register("type", {
                required: "Type is mandatory"
              })}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="VIDEO">Video</option>
              <option value="ARTICLE">Article</option>
              <option value="IMAGE">Image</option>
              <option value="AUDIO">Audio</option>

            </select>
            {errors.type && (
              <span className="text-red-500 text-md mt-1">{errors.type.message}</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="tags" className="text-white mb-2">
              Tags
            </label>
            <div className="p-2 border border-stone-600 rounded-md bg-black text-white flex flex-wrap items-center gap-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-stone-700 text-white px-3 py-1 rounded-full"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-red-400 hover:text-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyPress={handleTagKeyPress}
                className="bg-black text-white flex-grow outline-none"
                placeholder="Type a tag and press Enter"
              />
            </div>
            {suggestedTags.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-black border border-stone-600 mt-1 rounded-md z-10">
                {suggestedTags.map((tag, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(tag)}
                    className="text-white p-2 cursor-pointer hover:bg-stone-700"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-3 rounded-md shadow-md">
          {notification}
        </div>
      )}
    </div>
  ) : null;
}

export default Modal;
