"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import {
  getGroups,
  deleteGroup,
  updateGroup,
  createGroup,
} from "@/lib/group-service";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import GroupCard from "./components/GroupCard";
import { toast } from "sonner";
import { Select } from "@/components/ui/select";
import axiosClient from "@/app/api/AxiosClient";

interface Group {
  _id: string;
  name: string;
  students: string[];
}

export default function Groups() {
  const [loading,setLoading] = useState(false)
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [allSudents,setAllStudents] = useState<any>()
  const [page, setPage] = useState(1);
  const limit = 5;

  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [groupName, setGroupName] = useState("");
  const [students,setStudents] = useState<Map<string,string>>(new Map());

  const handleSave = async () => {
    try {
      if (editingGroup) {
        await updateGroup(editingGroup._id, groupName);
        toast.success("Group updated successfully");
        setAllGroups((prev) =>
          prev.map((g) =>
            g._id === editingGroup._id ? { ...g, name: groupName } : g,
          ),
        );
      } else {
        await createGroup(groupName);
        toast.success("Group created successfully");
        const data = await getGroups(1, 100);
        setAllGroups(Array.isArray(data) ? data : []);
      }
      setShowModal(false);
      setGroupName("");
      setEditingGroup(null);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      const data = await getGroups(page, limit);
      setAllGroups(Array.isArray(data) ? data : []);
      const StudentsList = await axiosClient.get('/api/student')
      console.log(StudentsList.data);
      
      setAllStudents(StudentsList.data)
    };
    fetchAll();
  }, []);

  const paginatedGroups = useMemo(() => {
    const start = (page - 1) * limit;
    return allGroups.slice(start, start + limit);
  }, [allGroups, page]);

  const totalPages = Math.ceil(allGroups.length / limit) || 1;

  const handleDelete = async (id: string) => {
    await deleteGroup(id);
    setAllGroups((prev) => prev.filter((g) => g._id !== id));
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Groups</h2>
        <button
          onClick={() => {
            setEditingGroup(null);
            setGroupName("");
            setShowModal(true);
          }}
          className="group bg-white border border-black flex items-center gap-3 px-4 py-2 rounded-2xl font-medium hover:bg-gray-50 transition-all text-sm"
        >
          <div className="bg-[#0b132b] text-white p-1 rounded-full transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
            <Plus size={16} strokeWidth={3} />
          </div>
          <span className="text-black pr-2">Add Group</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-lg mb-4">
              {editingGroup ? "Edit Group" : "Add Group"}
            </h3>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border rounded-xl mb-4"
              placeholder="Group name"
            />
           <select  onChange={(e)=>{
            const [key,value] = e.target.value.split(':')
            students.set(key,value)
            setStudents(students);
            console.log(students);

            
            }}>
              <option value={':'} disabled>students</option>
           {allSudents?.map((st,i)=>st?.group ? <></> : <option key={i} value={`${st.first_name} ${st.last_name}:${st._id}`}>{st?.first_name + ' ' + st?.last_name}</option>)}
           </select >
           <div className="flex flex-col max-h-40 overflow-y-auto">
            {students.entries().map((s,i)=><p className="px-4 py-2 m-2 border border-dark rounded-xl relative"  key={i}>{s[1]} <span className="absolute right-0 px-4 py-2 text-red-700 top-0 rounded-r-xl cursor-pointer hover:bg-red-100" onClick={()=>{students.delete(s[0]);setStudents(students)}}>x</span></p>)}
           </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {setShowModal(false);setStudents(new Map())}}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={groupName.trim() === ""}
                className="px-4 py-2 rounded-xl bg-[#0b132b] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Suspense fallback={<p>loading...</p>}>
          <>
        {paginatedGroups.map((group) => (
          <GroupCard
            key={group._id}
            group={group}
            onDelete={handleDelete}
            onEdit={(g) => {
              setEditingGroup(g);
              setGroupName(g.name);
              setShowModal(true);
            }}
          />
        ))}
        </>
        </Suspense>
      </div>

      {/* Pagination UI */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 rounded-full border bg-white disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 rounded-full border bg-white disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
