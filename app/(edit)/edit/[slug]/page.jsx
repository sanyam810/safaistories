"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Nav from "@/components/nav";
import styles from "./editPage.module.css"; // Assuming you'll create a CSS module similar to writePage.module.css

const EditPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { slug } = useParams(); // Assuming you're using the new App Router in Next.js 13
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();
      setPost(data);
      setTitle(data.title);
      setValue(data.desc);
      setMedia(data.img);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/posts/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
      }),
    });
  
    if (res.ok) {
      const data = await res.json();
      router.push(`/`);
      toast.success("Post updated successfully!");
    } else {
      const errorData = await res.json();
      toast.error(`Error updating post: ${errorData.message}`);
    }
  };

  return (
    <div>
      <Nav />
      <div className={`${styles.container} mx-auto max-w-screen-xl pt-32`} style={{ paddingTop: '40px' }}>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          value={title}
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
              <Button className="mt-32 cursor-auto" variant="default" onClick={handleSubmit}> Update </Button>
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

export default EditPage;
