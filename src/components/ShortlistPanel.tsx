import { useShortlistStore } from "@/store/shortlistStore";
import { VerifiedBadge } from "./VerifiedBadge";

// Assignment: Displays shortlisted influencers and allows removing them.
export function ShortlistPanel() {
  const { shortlisted, removeProfile } = useShortlistStore();

  return (
    <div className="mb-6 rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">
        ⭐ Shortlisted ({shortlisted.length})
      </h2>

      {shortlisted.length === 0 ? (
        <p className="text-sm text-gray-400">No profiles shortlisted.</p>
      ) : (
        <div className="space-y-2">
          {shortlisted.map((profile) => (
            <div
                key={profile.user_id}
                className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3 hover:border-blue-500 transition"
                >
                <div className="flex items-center gap-3">
                    <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-12 h-12 rounded-full"
                    />

                    <div>
                    <div className="font-bold text-white">
                        @{profile.username}
                        <VerifiedBadge verified={profile.is_verified} />
                    </div>

                    <div className="text-gray-400 text-sm">
                        {profile.fullname}
                    </div>

                    <div className="text-gray-300 text-sm">
                        {profile.followers >= 1000000
                        ? (profile.followers / 1000000).toFixed(1) + "M followers"
                        : profile.followers >= 1000
                        ? (profile.followers / 1000).toFixed(0) + "K followers"
                        : profile.followers + " followers"}
                    </div>
                    </div>
                </div>

                <button
                    onClick={() => removeProfile(profile.user_id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                    Remove
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}