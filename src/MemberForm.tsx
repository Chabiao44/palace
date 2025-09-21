// MemberForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Member } from "./types"; // สมมติคุณมี type Member

const MemberSchema = z.object({
  prefix: z.string().min(1, "จำเป็นต้องเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo: z
    .any()
    .refine((file) => file?.length === 1, "กรุณาอัปโหลดรูปถ่าย 2 นิ้ว"),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  ministerRole: z.string().optional(),
  ministry: z.string().optional(),
  politicalParty: z.string().min(1, "กรุณากรอกพรรคการเมือง"),
});

type MemberFormData = z.infer<typeof MemberSchema>;

type MemberFormProps = {
  onSubmit: (data: MemberFormData) => void;
  defaultValues?: MemberFormData;
};

export default function MemberForm({ onSubmit, defaultValues }: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(MemberSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow rounded"
    >
      <div>
        <label>คำนำหน้า</label>
        <select {...register("prefix")} className="w-full border rounded p-2">
          <option value="">--เลือก--</option>
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        {errors.prefix?.message && <p className="text-red-500">{errors.prefix.message}</p>}
      </div>

      <div>
        <label>ชื่อ</label>
        <input {...register("firstName")} className="w-full border rounded p-2" />
        {errors.firstName?.message && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <label>นามสกุล</label>
        <input {...register("lastName")} className="w-full border rounded p-2" />
        {errors.lastName?.message && <p className="text-red-500">{errors.lastName.message}</p>}
      </div>

      <div>
        <label>รูปถ่าย 2 นิ้ว</label>
        <input type="file" {...register("photo")} className="w-full" />
        {errors.photo?.message && <p className="text-red-500">{errors.photo.message}</p>}
      </div>

      <div>
        <label>ประวัติการทำงาน</label>
        <textarea {...register("workHistory")} className="w-full border rounded p-2" />
      </div>

      <div>
        <label>ผลงานที่ผ่านมา</label>
        <textarea {...register("achievements")} className="w-full border rounded p-2" />
      </div>

      <div>
        <label>ตำแหน่งรัฐมนตรี</label>
        <input {...register("ministerRole")} className="w-full border rounded p-2" />
      </div>

      <div>
        <label>กระทรวง</label>
        <input {...register("ministry")} className="w-full border rounded p-2" />
      </div>

      <div>
        <label>สังกัดพรรคการเมือง</label>
        <input {...register("politicalParty")} className="w-full border rounded p-2" />
        {errors.politicalParty?.message && <p className="text-red-500">{errors.politicalParty.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        บันทึกข้อมูล
      </button>
    </form>
  );
}
