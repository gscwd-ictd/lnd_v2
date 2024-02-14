"use client";

import axios from "axios";
import { useState } from "react";

export default function TestPage() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onSubmit = async () => {
    // const data = await axios.post(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket`, { id, name });
    // console.log(data);
    const data = await axios.delete(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/files/65cada0bec9dc6e75ae3/123123123`);
  };

  return (
    <div className="flex w-screen h-screen border">
      <div className="flex flex-col gap-2">
        <label htmlFor="id">id</label>
        <input id="id" type="text" className="rounded" onChange={(e) => setId(e.target.value)} />

        <label htmlFor="name">Name</label>
        <input id="name" type="text" className="rounded" onChange={(e) => setName(e.target.value)} />
        <button onClick={onSubmit} className="px-3 py-2 text-white bg-indigo-600 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
