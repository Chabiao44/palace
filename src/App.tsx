// App.tsx
import { useState } from "react";
import MemberForm from "./MemberForm";

type MemberFormData = {
  prefix: string;
  firstName: string;
  lastName: string;
  photo?: FileList;
  workHistory?: string;
  achievements?: string;
  ministerRole?: string;
  ministry?: string;
  politicalParty: string;
};

export default function App() {
  const [members, setMembers] = useState<MemberFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // index ของ member ที่กำลัง edit

  const handleAddOrEditMember = (data: MemberFormData) => {
    if (editingIndex !== null) {
      // แก้ไข member ที่มีอยู่
      setMembers((prev) => prev.map((m, i) => (i === editingIndex ? data : m)));
      setEditingIndex(null);
    } else {
      // เพิ่ม member ใหม่
      setMembers((prev) => [...prev, data]);
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Member Form</h1>

      <MemberForm
        onSubmit={handleAddOrEditMember}
        defaultValues={editingIndex !== null ? members[editingIndex] : undefined}
      />

      <h2 className="text-xl font-semibold mt-6">Saved Members</h2>
      <ul className="mt-2">
        {members.map((m, index) => (
          <li key={index} className="border p-2 my-1 rounded flex justify-between items-center">
            <span>
              {m.prefix} {m.firstName} {m.lastName} - {m.politicalParty}
            </span>
            <button
              className="bg-yellow-400 text-white px-2 py-1 rounded"
              onClick={() => handleEditClick(index)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
