import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/shortlistStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

// Search result card with navigation and shortlist support.
export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  // Assignment: Connect the search results to the shared shortlist state.
  const { addProfile, isShortlisted } = useShortlistStore();

  const shortlisted = isShortlisted(profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full max-w-3xl items-center gap-3 p-3 mb-2 rounded-lg border border-gray-700 bg-gray-900 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-gray-800 hover:shadow-lg"
      data-search={searchQuery}
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold text-white">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-400">{profile.fullname}</div>
        <div className="text-sm text-gray-300">{formatFollowersLocal(profile.followers)}</div>
      </div>

      {/* Assignment: Add influencer to the global shortlist using Zustand. */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addProfile(profile);
        }}
        disabled={shortlisted}
        className={`px-3 py-1 text-sm rounded transition ${
          shortlisted
            ? "bg-green-600 text-white cursor-default"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {shortlisted ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}
