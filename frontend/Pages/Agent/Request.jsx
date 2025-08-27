import React, { useState } from 'react';
import { applications } from '../../Assets/assets';

const Request = () => {
    const [selectedApplication, setSelectedApplications] = useState(null);

    const handleViewDetails = (id) => {
        setSelectedApplications(prev => prev === id ? null : id);
    };

    return (
        <div className="overflow-x-auto p-6">
            <h1 className="text-2xl font-bold mb-6 w-[250px] mx-auto">Application List</h1>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-sm md:text-base">
                        <th className="px-4 py-2 border-b">User ID</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Product Name</th>
                        <th className="px-4 py-2 border-b">Date</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">View</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <React.Fragment key={app.id}>
                            <tr className="hover:bg-gray-50 text-center text-sm md:text-base">
                                <td className="px-4 py-2 border-b">{app.id}</td>
                                <td className="px-4 py-2 border-b">{app.firstName} {app.lastName}</td>
                                <td className="px-4 py-2 border-b">{app.policy}</td>
                                <td className="px-4 py-2 border-b">{app.date}</td>
                                <td className="px-4 py-2 border-b">{app.status}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleViewDetails(app.id)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                    >
                                        {selectedApplication === app.id ? 'Hide' : 'View'}
                                    </button>
                                </td>
                            </tr>

                            {selectedApplication === app.id && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 border-b bg-gray-50">
                                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm md:text-base">
                                            <div><strong>First Name:</strong> {app.firstName}</div>
                                            <div><strong>Last Name:</strong> {app.lastName}</div>
                                            <div><strong>Policy:</strong> {app.policy}</div>
                                            <div><strong>Occupation:</strong> {app.occupation}</div>
                                            <div><strong>Phone:</strong> {app.phone}</div>
                                            <div><strong>Email:</strong> {app.email}</div>
                                            <div><strong>Income:</strong> {app.income}</div>
                                            <div><strong>Date of Birth:</strong> {app.dateOfBirth}</div>
                                            <div><strong>Gender:</strong> {app.gender}</div>
                                            <div><strong>Marital Status:</strong> {app.maritalStatus}</div>
                                            <div><strong>Address:</strong> {app.address}</div>
                                            <div><strong>Pin Code:</strong> {app.pinCode}</div>
                                            <div><strong>Aadhar File:</strong> {app.aadharFile}</div>
                                            <div><strong>Pan File:</strong> {app.panFile}</div>
                                            <div><strong>Insurance Type:</strong> {app.insuranceType}</div>
                                            <div><strong>Status:</strong> {app.status}</div>

                                        </div>
                                        <button type="submit" className=" mt-4 ml-[150px] md:ml-[500px] bg-gradient-to-r    from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-2xl px-5 py-1 text-[20px]">Submit</button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Request;
