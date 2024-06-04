"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { unstable_noStore as noStore } from 'next/cache';
import toast, { Toaster } from "react-hot-toast";
import { EditorState, convertToRaw } from 'draft-js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Nav from "@/components/nav";
import styles from "./writePage.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            toast.success("Image uploaded successfully!");
          });
        }
      );
    }
  }, [file]);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    noStore();
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
      toast.success("Post published successfully!");
    } else {
      toast.error("Error publishing post");
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className={`${styles.container} mx-auto max-w-screen-xl pt-32`} style={{ paddingTop: '40px' }}>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={`${styles.editor} flex flex-col`}>
          <div className="flex flex-col">
            <button className={styles.button} onClick={() => setOpen(!open)} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <Image src="/images/plus.png" alt="" width={40} height={40} />
            </button>
            {file && (
              <div><p style={{ paddingLeft: '10px', paddingRight: '10px' }}>Selected Image: {file.name}</p></div>
            )}
          </div>
          <div>
            <ReactQuill
              id="my-quill-editor"
              className={`${styles.textArea} z-20 `}
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Tell your story..."
            />
            <div style={{ paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
              <Button className="mt-32 cursor-auto" variant="default" onClick={handleSubmit}> Publish </Button>
            </div>
          </div>
          {open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <button className={styles.addButton}>
                <label htmlFor="image">
                  <Image src="/images/image.png" alt="" width={25} height={25} />
                </label>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritePage;
