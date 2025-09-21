import { useState } from "react";
import MemberForm from "./MemberForm";
import { v4 as uuidv4 } from "uuid";

type Member = {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  workHistory?: string;
  achievements?: string;
  ministerRole?: string;
  ministry?: string;
  politicalParty: string;
};

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const handleAddMember = (data: Omit<Member, "id">) => {
    setMembers([...members, { id: uuidv4(), ...data }]);
  };

  const handleUpdateMember = (data: Omit<Member, "id">) => {
    if (!editingMember) return;
    setMembers(
      members.map((m) => (m.id === editingMember.id ? { ...m, ...data } : m))
    );
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-red-900 p-8 text-gray-100 font-serif">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-10 drop-shadow-lg">
        ระบบจัดการรายชื่อสมาชิกสภา
      </h1>

      {/* Form */}
      <div className="max-w-4xl mx-auto mb-12">
        <MemberForm
          onSubmit={editingMember ? handleUpdateMember : handleAddMember}
          defaultValues={editingMember ?? undefined}
        />
      </div>

      {/* Member List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-200 border-b-2 border-yellow-400 pb-2">
          รายชื่อสมาชิกทั้งหมด
        </h2>

        {members.length === 0 ? (
          <p className="text-gray-300 text-lg italic">ยังไม่มีข้อมูล</p>
        ) : (
          <div className="grid gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-gray-800 border-l-4 border-yellow-400 p-6 rounded-xl shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <p>
                    <span className="font-bold text-blue-400">ชื่อ:</span>{" "}
                    {member.prefix} {member.firstName} {member.lastName}
                  </p>
                  <p>
                    <span className="font-bold text-blue-400">กระทรวง:</span>{" "}
                    {member.ministry || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-blue-400">ตำแหน่ง:</span>{" "}
                    {member.ministerRole || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-blue-400">พรรค:</span>{" "}
                    {member.politicalParty}
                  </p>
                </div>

                <div className="flex flex-col space-y-3 mt-4 md:mt-0 md:flex-row md:space-x-4 md:space-y-0 justify-end">
                  <button
                    onClick={() => handleEditClick(member)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-lg shadow-lg transition"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
