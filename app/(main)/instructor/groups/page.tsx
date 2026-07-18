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
import axiosClient from "@/app/api/AxiosClient";

interface Group {
  _id: string;
  name: string;
  students: string[];
}

export default function Groups() {
  const [loading, setLoading] = useState(false);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [groupName, setGroupName] = useState("");

  const [students, setStudents] = useState<Map<string, string>>(new Map());

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await getGroups(1, 100);
      setAllGroups(Array.isArray(data) ? data : []);

      const StudentsList = await axiosClient.get("/api/student");
      setAllStudents(
        Array.isArray(StudentsList.data)
          ? StudentsList.data
          : StudentsList.data?.data || [],
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSave = async () => {
    try {
      const studentIds = Array.from(students.keys());

      if (editingGroup) {
        await updateGroup(editingGroup._id, groupName, studentIds);
        toast.success("Group updated successfully");

        setAllStudents((prevStudents) =>
          prevStudents.map((st) => {
            const wasInGroup = editingGroup.students.includes(st._id);
            const isStillInGroup = studentIds.includes(st._id);

            if (wasInGroup && !isStillInGroup) {
              return { ...st, group: null };
            } else if (!wasInGroup && isStillInGroup) {
              return { ...st, group: editingGroup._id };
            }
            return st;
          }),
        );
      } else {
        await createGroup(groupName, studentIds);
        toast.success("Group created successfully");
        setPage(1);
      }

      await fetchAll();

      setShowModal(false);
      setGroupName("");
      setEditingGroup(null);
      setStudents(new Map());
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const paginatedGroups = useMemo(() => {
    const start = (page - 1) * limit;
    return allGroups.slice(start, start + limit);
  }, [allGroups, page]);

  const totalPages = Math.ceil(allGroups.length / limit) || 1;

  const handleDelete = async (id: string) => {
    try {
      await deleteGroup(id);
      setAllGroups((prev) => prev.filter((g) => g._id !== id));

      const updatedTotalPages = Math.ceil((allGroups.length - 1) / limit) || 1;
      if (page > updatedTotalPages) {
        setPage(updatedTotalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Groups</h2>
        <button
          onClick={() => {
            setEditingGroup(null);
            setGroupName("");
            setStudents(new Map());
            setShowModal(true);
          }}
          className="group bg-white border border-black flex items-center gap-3 px-4 py-2 rounded-2xl font-medium hover:bg-gray-50 transition-all text-sm cursor-pointer"
        >
          <div className="bg-[#0b132b] text-white p-1 rounded-full transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
            <Plus size={16} strokeWidth={3} />
          </div>
          <span className="text-black pr-2">Add Group</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-xl flex flex-col gap-4">
            <h3 className="font-bold text-lg">
              {editingGroup ? "Edit Group" : "Add Group"}
            </h3>

            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border rounded-xl"
              placeholder="Group name"
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-semibold px-1">
                Select Students
              </label>
              <select
                className="w-full p-3 border rounded-xl bg-white text-sm"
                value=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  const [studentId, fullName] = e.target.value.split(":");

                  setStudents((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(studentId, fullName);
                    return newMap;
                  });
                }}
              >
                <option value="" disabled>
                  Choose a student...
                </option>
                {allStudents?.map((st, i) => {
                  const isCurrentGroupStudent =
                    editingGroup?.students?.includes(st._id);
                  if (st?.group && !isCurrentGroupStudent) return null;

                  return (
                    <option
                      key={i}
                      value={`${st._id}:${st.first_name} ${st.last_name}`}
                    >
                      {st?.first_name} {st?.last_name}
                    </option>
                  );
                })}
              </select>
            </div>

            {students.size > 0 && (
              <div className="flex flex-col max-h-40 overflow-y-auto border border-gray-100 rounded-xl p-1 bg-gray-50/50">
                {Array.from(students.entries()).map(([id, name], i) => (
                  <div
                    className="flex justify-between items-center px-3 py-1.5 m-1 bg-white border border-gray-200 rounded-lg text-sm text-slate-700"
                    key={id}
                  >
                    <span className="truncate">{name}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-bold px-2 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      onClick={() => {
                        setStudents((prev) => {
                          const newMap = new Map(prev);
                          newMap.delete(id);
                          return newMap;
                        });
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setStudents(new Map());
                }}
                className="px-4 py-2 rounded-xl border hover:bg-gray-50 cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={groupName.trim() === ""}
                className="px-4 py-2 rounded-xl bg-[#0b132b] text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && allGroups.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-semibold">
          Loading groups...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Suspense fallback={<p>loading...</p>}>
            {paginatedGroups.map((group) => (
              <GroupCard
                key={group._id}
                group={group}
                onDelete={handleDelete}
                onEdit={(g) => {
                  setEditingGroup(g);
                  setGroupName(g.name);

                  const existingStudentsMap = new Map<string, string>();
                  g.students.forEach((studentId) => {
                    const studentObj = allStudents.find(
                      (s) => s._id === studentId,
                    );
                    if (studentObj) {
                      existingStudentsMap.set(
                        studentId,
                        `${studentObj.first_name} ${studentObj.last_name}`,
                      );
                    } else {
                      existingStudentsMap.set(studentId, "Unknown Student");
                    }
                  });
                  setStudents(existingStudentsMap);
                  setShowModal(true);
                }}
              />
            ))}
          </Suspense>
        </div>
      )}

      {/* Pagination UI */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 rounded-full border bg-white disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-medium text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 rounded-full border bg-white disabled:opacity-50 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
