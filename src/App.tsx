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

  // สำหรับแก้ไข member เราจะเก็บ selectedMember
  const [selectedMember, setSelectedMember] = useState<MemberFormData | undefined>(undefined);

  const handleAddMember = (data: MemberFormData) => {
    setMembers((prev) => [...prev, data]);
    console.log("Saved Member:", data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Member Form</h1>

      <MemberForm
        onSubmit={handleAddMember}
        defaultValues={selectedMember} // ส่ง undefined หรือ member ที่เลือก
      />

      <h2 className="text-xl font-semibold mt-6">Saved Members</h2>
      <ul className="mt-2">
        {members.map((m, index) => (
          <li key={index} className="border p-2 my-1 rounded">
            {m.prefix} {m.firstName} {m.lastName} - {m.politicalParty}
          </li>
        ))}
      </ul>
    </div>
  );
}
