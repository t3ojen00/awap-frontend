import React from 'react';
import './groupsPage.css'

const GroupPage = () => {
    const handleNavigation = (path) => {
        window.location.href = path;
    };

    return (
        <div className="container">
            {/* Header Section */}
            <header>
                <h1>My Group</h1>
                <button className="btn danger" id="delete-group">Delete Group</button>
            </header>

            {/* Group Information Section */}
            <section className="group-info">
                <h2>Group Actions</h2>
                <button className="btn primary" id="create-group">Create Group</button>
                <button className="btn secondary" id="invite-member">Invite Members</button>
                <button className="btn secondary" id="leave-group">Leave Group</button>
                <button
                    className="btn chat"
                    onClick={() => handleNavigation('chat.html')}
                >
                    Chat
                </button>
                <button className="btn share-movie" id="share-movie">Share a Movie</button>
            </section>

            {/* Member Management Section */}
            <section className="member-management">
                <h2>Members</h2>
                <ul className="member-list">
                    <li>
                        <span>John Doe</span>
                        <button
                            className="btn edit"
                            onClick={() => handleNavigation('edit-members.html')}
                        >
                            Edit
                        </button>
                    </li>
                    <li>
                        <span>Jane Smith</span>
                        <button
                            className="btn edit"
                            onClick={() => handleNavigation('edit-members.html')}
                        >
                            Edit
                        </button>
                    </li>
                    <li>
                        <span>Mike Johnson</span>
                        <button
                            className="btn edit"
                            onClick={() => handleNavigation('edit-members.html')}
                        >
                            Edit
                        </button>
                    </li>
                </ul>
            </section>

            {/* Join Requests Section */}
            <section className="join-requests">
                <h2>Join Requests</h2>
                <ul className="request-list">
                    <li>
                        <span>Anna Lee</span>
                        <button className="btn accept">Accept</button>
                        <button className="btn reject">Reject</button>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default GroupPage;
