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
  const [invitedUserName, setInvitedUserName] = useState("");
  const [joinRequests, setJoinRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Fetch group details on component mount
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Fetch group metadata
        const response = await apiClient.get(`/groups/all/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroup(response.data);

        // Fetch membership details
        const membershipResponse = await apiClient.get(
          `/groups/${groupId}/role`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setIsMember(membershipResponse.data.isMember);
        setIsInvited(membershipResponse.data.isInvited);
        setIsAdmin(membershipResponse.data.role === "admin");

        // Fetch join requests if admin
        if (membershipResponse.data.role === "admin") {
          const requestsResponse = await apiClient.get(
            `/groups/${groupId}/member-requests`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setJoinRequests(requestsResponse.data || []);
        }

        // Fetch invitations if invited
        // if (membershipResponse.data.isInvited) {
        //   const invitationsResponse = await apiClient.get(
        //     `/groups/${groupId}/member-invitated`,
        //     { headers: { Authorization: `Bearer ${token}` } }
        //   );
        //   if (invitationsResponse.data) {
        //     setIsInvited(true);
        //   }
        // }

        if (membershipResponse.data.isInvited) {
          const invitationsResponse = await apiClient.get(
            `/groups/${groupId}/member-invitated`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        
          console.log("Invitation Response:", invitationsResponse.data); // Debugging
          if (invitationsResponse.data) {
            setIsInvited(true); // Set `isInvited` to true
            setInvitedUserName(invitationsResponse.data.user_name); // Set `user_name` from the response
          }
        }
        
        

        // Fetch group members
        const membersResponse = await apiClient.get(
          `/groups/${groupId}/members`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMembers(membersResponse.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch group details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId, token]);

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

  const handleRespondToInvite = async (response) => {
    try {
      const res = await apiClient.post(
        `/groups/${groupId}/respond`,
        { response },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        if (response === "accept") {
          setIsMember(true);
          setIsInvited(false);
          toast.success("You have successfully joined the group.");
        } else if (response === "reject") {
          setIsInvited(false);
          toast.success("You have rejected the invitation.");
        }
      }
    } catch (error) {
      console.error("Error responding to invitation:", error);
      toast.error("Failed to respond to the invitation.");
    }
  };

  return (
    <div className="group-page container">
      <GroupHeader
        group={group}
        isAdmin={isAdmin}
        onDeleteGroup={handleDeleteGroup}
      />

      <button
        className="btn chat"
        onClick={() => (window.location.href = "chat.html")}
      >
        Chat
      </button>
      <button className="btn share-movie" id="share-movie">
        Share a Movie
      </button>

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

        {isAdmin && (
          <JoinRequests
            joinRequests={joinRequests}
            groupId={groupId}
            token={token}
            setJoinRequests={setJoinRequests}
            setMembers={setMembers}
          />
        )}

{!isAdmin && isInvited && (
  <div className="invitation-response">
    <h2 className="invitation-title">You have been invited to join this group, {invitedUserName}!</h2>
    <div className="invitation-buttons">
      <button
        className="btn accept"
        onClick={() => handleRespondToInvite("accept")}
      >
        Accept
      </button>
      <button
        className="btn reject"
        onClick={() => handleRespondToInvite("reject")}
      >
        Reject
      </button>
    </div>
  </div>
)}



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
