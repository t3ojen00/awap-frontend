import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./groupsPage.css";
import apiClient from "../../lib/api";
import { toast } from "react-hot-toast";
import GroupHeader from "./groups_components/GroupHeader";
import GroupActions from "./groups_components/GroupActions";
import MemberManagement from "./groups_components/MemberManagement";
import JoinRequests from "./groups_components/JoinRequests";
import InviteModal from "./groups_components/InviteModal";

const GroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [group, setGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Fetch group details on component mount
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Fetch group data
        const response = await apiClient.get(`/groups/all/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroup(response.data);

        // Fetch membership status
        const membershipResponse = await apiClient.get(
          `/groups/${groupId}/role`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Membership Response:", membershipResponse.data);

        setIsMember(membershipResponse.data.isMember);
        setIsInvited(membershipResponse.data.isInvited);
        setIsAdmin(membershipResponse.data.role === "admin");

        // If admin, fetch join requests
        if (membershipResponse.data.role === "admin") {
          const requestsResponse = await apiClient.get(
            `/groups/${groupId}/join-requests`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setJoinRequests(requestsResponse.data || []);
        }

        // Fetch group members
        const membersResponse = await apiClient.get(`/groups/${groupId}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(membersResponse.data);
      } catch (err) {
        toast.error("Failed to fetch group details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId, token]);

  // Handle group deletion
  const handleDeleteGroup = async () => {
    try {
      await apiClient.delete(`/groups/delete/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Group deleted successfully.");
      navigate("/groups");
    } catch (err) {
      toast.error("Failed to delete the group.");
    }
  };

  // Handle member removal
  const handleDeleteMember = async (userId) => {
    try {
      await apiClient.delete(`/groups/${groupId}/members/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.user_id !== userId)
      );
      toast.success("Member removed successfully.");
    } catch (err) {
      console.error("Error removing the member:", err);
      toast.error("Failed to remove member.");
    }
  };

  return (
    <div className="group-page container">

      {/* Group Header */}
      <GroupHeader
        group={group}
        isAdmin={isAdmin}
        onDeleteGroup={handleDeleteGroup}
      />

       {/* Group Actions */}
       <button
        className="btn chat"
        onClick={() => (window.location.href = "chat.html")}>
        Chat
      </button>

      <button className="btn share-movie" id="share-movie">
        Share a Movie
      </button>
 {/* Group Actions */}
      
      <section className="group-info">
       
        <GroupActions
          isAdmin={isAdmin}
          isMember={isMember}
          isInvited={isInvited}
          groupId={groupId}
          token={token}
          setShowInviteModal={setShowInviteModal}
          setIsMember={setIsMember}
          setIsInvited={setIsInvited}
        />

        <MemberManagement
              members={members}
              isAdmin={isAdmin}
              handleDeleteMember={handleDeleteMember}
            />

        {/* Member Management (for Admins only) */}
        {isAdmin && (
          <>
           
            <JoinRequests
              joinRequests={joinRequests}
              groupId={groupId}
              token={token}
              setJoinRequests={setJoinRequests}
              setMembers={setMembers}
            />
          </>
        )}

        {/* Invite Modal */}
      {showInviteModal && (
        <InviteModal
          groupId={groupId}
          token={token}
          setShowInviteModal={setShowInviteModal}
        />
      )}

       
      </section>

      
    </div>
  );
};

export default GroupPage;
