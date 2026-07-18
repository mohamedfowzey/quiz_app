"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface Group {
  _id: string;
  name: string;
  students: string[];
}

interface GroupCardProps {
  group: Group;
  onDelete: (id: string) => Promise<void>;
  onEdit: (group: Group) => void;
}

export default function GroupCard({ group, onDelete, onEdit }: GroupCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowConfirm(false);
      }
    };
    if (showConfirm) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showConfirm]);

  const handleDelete = async (): Promise<void> => {
    setIsDeleting(true);
    try {
      await onDelete(group._id);
      setShowConfirm(false);
      toast.success("Group deleted successfully");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || "Failed to delete group";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex justify-between items-center hover:shadow-md transition-all w-full">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">
            Group: {group.name}
          </h3>
          <p className="text-sm text-slate-500">
            {group.students?.length || 0} students
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(group)}
            className="p-2 hover:bg-gray-100 rounded-full text-emerald-600"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 hover:bg-gray-100 rounded-full text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Delete Group</h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <p>
                Are you sure you want to delete <strong>{group.name}</strong>?
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 text-white disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
