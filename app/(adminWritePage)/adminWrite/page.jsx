"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { unstable_noStore as noStore } from 'next/cache';
import toast from "react-hot-toast";
import { EditorState } from 'draft-js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Nav from "@/components/nav";
import { Separator } from "@/components/ui/separator";
import styles from "./writePage.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

const WritePage = () => {
    noStore();
    const { status } = useSession();
    const router = useRouter();

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [transcript, setTranscript] = useState("");
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [youtubeId, setYoutubeId] = useState("");

    useEffect(() => {
        const storage = getStorage(app);
        const upload = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                (error) => { },
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
        return null;
    }

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
        const res = await fetch("/api/highlights", {
            method: "POST",
            body: JSON.stringify({
                title,
                summary: value,
                transcript: transcript,
                image: media,
                slug: slugify(title),
                youtubeId: youtubeId.substring(3, youtubeId.length - 3),
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/highlights/${data.slug}`);
            toast.success("Post published successfully!");
        } else {
            toast.error("Error publishing post");
        }
    };

    return (
        <div>
            <Nav />
            <div className={`${styles.container} mx-auto max-w-screen-xl pt-32`} style={{ paddingTop: '40px' }}>
                <input
                    type="text"
                    placeholder="Podcast Title"
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
                            className={`${styles.textArea} z-20`}
                            theme="bubble"
                            value={value}
                            onChange={setValue}
                            placeholder="Podcast Summary"
                        />
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '4px', paddingRight: '4px' }}>
                            <Separator />
                        </div>
                        {/* <ReactQuill
                            className={`${styles.textArea} z-20`}
                            theme="bubble"
                            value={transcript}
                            onChange={setTranscript}
                            placeholder="Paste Transcript here"
                        /> */}
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '4px', paddingRight: '4px' }}>
                            <Separator />
                        </div>
                        <ReactQuill
                            className={`${styles.textArea} z-20`}
                            theme="bubble"
                            value={youtubeId}
                            onChange={setYoutubeId}
                            placeholder="Carefully paste the Youtube SRC URL from the embed code here"
                        />
                        <div style={{ paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
                            <Button variant="default" onClick={handleSubmit}> Publish </Button>
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
