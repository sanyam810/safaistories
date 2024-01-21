"use client";

// import { signIn, useSession } from "next-auth/react";
import styles from "./writePage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";

import toast from "react-hot-toast";

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import { app } from "@/utils/firebase";
import { app } from "@/utils/firebase";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import Nav from "@/components/nav";
import { Separator } from "@/components/ui/separator";
// import { set } from "lodash";
// import { stat } from "fs";

// const editorStyle = {
//   fontSize: '16px', // Change this value to adjust the font size
// };


const WritePage = () => {
  const { status } = useSession();

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  // const ReactQuill = dynamic(()=> import('react-quill'),{ssr:false})
  const router = useRouter();

  const [transcript,setTranscipt]=useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  // const [catSlug, setCatSlug] = useState("");

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

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

      

  const handleSubmit = async () => {
    
    // const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const res = await fetch("/api/highlights", {
      method: "POST",
      body: JSON.stringify({
        title,
        summary: value,
        transcript: transcript,
        image: media,
        slug: slugify(title),
        youtubeId: youtubeId.substring(3, youtubeId.length - 3),
        // catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/highlights/${data.slug}`);
      toast.success("Post published successfully!");
    }

    if(res.status !== 200){
      toast.error("Error publishing post");
    }
  };
  
  const descStyle2 = {
    fontFamily: 'Georgia,serif',
    fontSize: '1.5rem',
    lineHeight: '1.6'
    // Add more font styles as needed
  };

  return (
    <div>
      <Nav />
    <div className={`${styles.container} mx-auto max-w-screen-xl pt-32`} style={{paddingTop:'40px'}}>
      <input
        type="text"
        placeholder="Podcast Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />

      
      
      <div className={`${styles.editor} flex flex-col`}>
        
        <div className="flex flex-col">
          <button className={styles.button} onClick={() => setOpen(!open)} style={{paddingLeft: '10px', paddingRight: '10px' }}>
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
            placeholder="Podcast Summary"
          />

          <div style={{paddingTop:'4px',paddingBottom:'4px',paddingLeft:'4px',paddingRight:'4px'}}>
            <Separator/>
          </div>
          
          <ReactQuill
            id="my-quill-editor"
            className={`${styles.textArea} z-20 `}
            theme="bubble"
            value={transcript}
            onChange={setTranscipt}
            placeholder="Paste Transcipt here"
          />

          <div style={{paddingTop:'4px',paddingBottom:'4px',paddingLeft:'4px',paddingRight:'4px'}}>
            <Separator/>
          </div>

          <ReactQuill
            id="my-quill-editor"
            className={`${styles.textArea} z-20 `}
            theme="bubble"
            value={youtubeId}
            onChange={setYoutubeId}
            placeholder="Carefully paste the Youtube SRC URL from the embbed code here"
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
      {/* <div>
        <Button className="mt-32" variant="default" onClick={handleSubmit}> Publish </Button>
      </div> */}
      
      {/* <button className={`${styles.publish}`} onClick={handleSubmit}> */}
      {/* </button> */}
    </div>
    </div>
  );
};

export default WritePage;