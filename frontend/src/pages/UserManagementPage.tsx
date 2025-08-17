import React, { useEffect, useState } from "react";
import type { AuthUser } from "../types/auth";
import { userService } from "../services/userService";

/**
 * Admin user management: list users and delete users (admins cannot be deleted)
 */
const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<AuthUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    // Helper to obtain unique id from backend user object
    const getUserId = (user: AuthUser): string => {
        // Normalize possible id fields without using `any`
        const u = user as Partial<Record<"id" | "_id", string>>;
        return u.id ?? u._id ?? "";
    };

    const handleDeleteUser = async (userId: string) => {
        if (!userId) {
            setError("Invalid user id");
            return;
        }
        const confirmed = window.confirm("Delete this user? This action cannot be undone.");
        if (!confirmed) return;

        setSaving((s) => ({ ...s, [userId]: true }));
        try {
            await userService.deleteUser(userId);
            setUsers((prev) => prev.filter((u) => getUserId(u) !== userId));
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to delete user");
        } finally {
            setSaving((s) => ({ ...s, [userId]: false }));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            {loading && <div>Loading users...</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}

            {!loading && users.length === 0 && <div>No users found.</div>}

            {!loading && users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded shadow">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                const uid = getUserId(user);
                                const fallbackKey = uid || user.email || `user-${index}`;
                                const isAdmin = user.role === "admin";
                                return (
                                    <tr key={fallbackKey} className="border-b">
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.role}</td>
                                        <td className="p-3 space-x-2">
                                            <button
                                                onClick={() => fetchUsers()}
                                                className="text-sm text-gray-600 hover:underline"
                                            >
                                                Refresh
                                            </button>

                                            <button
                                                onClick={() => handleDeleteUser(uid)}
                                                disabled={isAdmin || !!saving[uid]}
                                                className={`text-sm px-2 py-1 rounded ${isAdmin
                                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                    : "bg-red-600 text-white hover:bg-red-700"
                                                    }`}
                                                title={isAdmin ? "Cannot delete admin user" : "Delete user"}
                                            >
                                                {saving[uid] ? "Deleting..." : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;