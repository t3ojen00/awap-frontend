import React from "react";
import { toast } from "react-hot-toast";
import apiClient from "../../../lib/api";
import "../groupsPage.css";

const GroupActions = ({
  isAdmin,
  isMember,
  isInvited,
  setShowInviteModal,
  groupId,
  token,
  setIsMember,
  setIsInvited,
}) => {
  const handleJoinGroup = async () => {
    try {
      const response = await apiClient.post(
        `/groups/${groupId}/request`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Join request sent successfully.");
        setIsMember(false); // User is not yet a member
        setIsInvited(false); // Not an invitation scenario
      } else {
        toast.error("Failed to send join request.");
      }
    } catch (error) {
      console.error("Error sending join request:", error);
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const response = await apiClient.post(
        `/groups/${groupId}/leave`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Successfully left the group.");
        setIsMember(false);
      } else {
        toast.error("Failed to leave the group.");
      }
    } catch (error) {
      console.error("Error leaving the group:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleAcceptInvitation = async () => {
    try {
      const response = await apiClient.post(
        `/groups/${groupId}/respond`,
        { response: "accept" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully joined the group.");
        setIsInvited(false);
        setIsMember(true);
      } else {
        toast.error("Failed to accept the invitation.");
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleRejectInvitation = async () => {
    try {
      const response = await apiClient.post(
        `/groups/${groupId}/respond`,
        { response: "reject" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Invitation rejected successfully.");
        setIsInvited(false);
      } else {
        toast.error("Failed to reject the invitation.");
      }
    } catch (error) {
      console.error("Error rejecting invitation:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <h2>Group Actions</h2>

      {/* Non-admin actions */}
      {!isAdmin && (
        <div className="group-actions-line">
          {/* Show "Join Group"** !isInvited && **button if user is not a member and has no invitation */}
          {!isMember && (
            <button className="btn primary" onClick={handleJoinGroup}>
              Join Group
            </button>
          )}

          {/* Show "Leave Group" button if user is a member */}
          {!isMember && (
            <button className="btn secondary" onClick={handleLeaveGroup}>
              Leave Group
            </button>
          )}
        </div>
      )}

      {/* Admin actions */}
      {isAdmin && (
        <button className="btn secondary" onClick={() => setShowInviteModal(true)}>
          Invite Members
        </button>
      )}

      {/* Admin-only "Accept/Reject Invitation" buttons */}
      {isAdmin && isInvited && (
        <div className="group-actions-line invitation-response">
          <h2>Approve Requests</h2>
          <button className="btn accept" onClick={handleAcceptInvitation}>
            Accept
          </button>
          <button className="btn reject" onClick={handleRejectInvitation}>
            Reject
          </button>
        </div>
      )}
    </>
  );
};

export default GroupActions;
