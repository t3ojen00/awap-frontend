import React, { useState, useEffect } from 'react';
import apiClient from '../lib/api.js'; // Import the configured Axios instance

const GroupsPage = () => {
    const [requests, setRequests] = useState([]); // To track join requests
    const [members, setMembers] = useState([]); // To track group members
    const [groupName, setGroupName] = useState('My Group'); // Placeholder group name
    const groupId = '12345'; // Replace with the actual group ID

    // Load group data on component mount
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const [membersRes, requestsRes] = await Promise.all([
                    apiClient.get(`/groups/${groupId}/members`),
                    apiClient.get(`/groups/${groupId}/requests`),
                ]);
                setMembers(membersRes.data.members);
                setRequests(requestsRes.data.requests);
            } catch (err) {
                console.error('Error fetching group data:', err);
            }
        };

        fetchGroupData();
    }, [groupId]);

    const handleRequestJoin = async () => {
        try {
            await apiClient.post(`/groups/${groupId}/request`);
            alert('Join request sent.');
        } catch (err) {
            alert(err.response?.data?.error || 'Error sending join request.');
        }
    };

    const handleAcceptRequest = async (userId) => {
        try {
            await apiClient.patch(`/groups/${groupId}/members/${userId}`, { action: 'accept' });
            alert('Request accepted.');
            setRequests(requests.filter(req => req.userId !== userId));
        } catch (err) {
            alert(err.response?.data?.error || 'Error accepting request.');
        }
    };

    const handleRejectRequest = async (userId) => {
        try {
            await apiClient.patch(`/groups/${groupId}/members/${userId}`, { action: 'reject' });
            alert('Request rejected.');
            setRequests(requests.filter(req => req.userId !== userId));
        } catch (err) {
            alert(err.response?.data?.error || 'Error rejecting request.');
        }
    };

    const handleLeaveGroup = async () => {
        try {
            await apiClient.post(`/groups/${groupId}/leave`);
            alert('You left the group.');
        } catch (err) {
            alert(err.response?.data?.error || 'Error leaving the group.');
        }
    };

    const handleRemoveMember = async (userId) => {
        try {
            await apiClient.delete(`/groups/${groupId}/members/${userId}`);
            alert('Member removed.');
            setMembers(members.filter(member => member.userId !== userId));
        } catch (err) {
            alert(err.response?.data?.error || 'Error removing member.');
        }
    };

    return (
        <div className="container">
            {/* Header Section */}
            <header>
                <h1>{groupName}</h1>
                <button onClick={handleLeaveGroup} className="btn danger">
                    Leave Group
                </button>
            </header>

            {/* Group Actions */}
            <section className="group-info">
                <h2>Group Actions</h2>
                <button onClick={handleRequestJoin} className="btn primary">
                    Request to Join
                </button>
            </section>

            {/* Member Management Section */}
            <section className="member-management">
                <h2>Members</h2>
                <ul className="member-list">
                    {members.map(member => (
                        <li key={member.userId}>
                            <span>{member.name}</span>
                            <button
                                onClick={() => handleRemoveMember(member.userId)}
                                className="btn edit"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Join Requests Section */}
            <section className="join-requests">
                <h2>Join Requests</h2>
                <ul className="request-list">
                    {requests.map(req => (
                        <li key={req.userId}>
                            <span>{req.name}</span>
                            <button
                                onClick={() => handleAcceptRequest(req.userId)}
                                className="btn accept"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleRejectRequest(req.userId)}
                                className="btn reject"
                            >
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default GroupsPage;
